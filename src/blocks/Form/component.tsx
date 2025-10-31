'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import RichText from '@/components/frontend/richtext'
import { cn } from '@/lib/utils'
import { useT } from '@/app/i18n/client'

export type FormBlockType = {
  blockName?: string
  blockType?: 'FormBlock'
  enableIntro?: boolean
  form: FormType & {
    privacyPolicy?: boolean
    contact?: boolean
    newsletter?: boolean
    marketing?: boolean
    termsAndConditions?: boolean
  }
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props
  const { t } = useT()
  const formMethods = useForm({
    defaultValues: { ...formFromProps.fields },
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const [ipAddress, setIpAddress] = useState<string | undefined>()
  useEffect(() => {
    void fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof (data as { ip: string } & { status: number }).ip === 'string') {
          setIpAddress((data as { ip: string } & { status: number }).ip)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const onSubmit = useCallback(
    (data: { [key: string]: any }) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        if (
          formFromProps.privacyPolicy &&
          !dataToSend.find((item) => item.field === 'privacyPolicy')
        ) {
          setError({
            message: 'You must agree to the privacy policy',
            status: '400',
          })
          return
        } else if (formFromProps.contact) {
          let agreement = ''
          agreement += `ID: ${'PRIVOLA-PROFILING-' + formID + '-' + Date.now()};`
          agreement += `Date and Time: ${new Date().toISOString()};`
          agreement += `IP Address: ${ipAddress};`
          agreement += `User Agent: ${navigator.userAgent};`
          agreement += `Channel: web;`
          agreement += `Status: active;`
          agreement += `Agreement: ${dataToSend.find((item) => item.field === 'privacyPolicy')?.value ? 'Accepted' : 'Rejected'};`
          agreement += 'Agreement for Profiling;'

          dataToSend.push({
            field: 'agreementForProfiling',
            value: agreement,
          })
        }

        if (formFromProps.marketing && !dataToSend.find((item) => item.field === 'marketing')) {
          setError({
            message: 'You must agree to the privacy policy',
            status: '400',
          })
          return
        } else if (formFromProps.contact) {
          let agreement = ''
          agreement += `ID: ${'PRIVOLA-MARKETING-' + formID + '-' + Date.now()};`
          agreement += `Date and Time: ${new Date().toISOString()};`
          agreement += `IP Address: ${ipAddress};`
          agreement += `User Agent: ${navigator.userAgent};`
          agreement += `Channel: web;`
          agreement += `Status: active;`
          agreement += `Agreement: ${dataToSend.find((item) => item.field === 'marketing')?.value ? 'Accepted' : 'Rejected'};`
          agreement += 'Agreement for Marketing;'

          dataToSend.push({
            field: 'agreementForMarketing',
            value: agreement,
          })
        }
        if (formFromProps.contact && !dataToSend.find((item) => item.field === 'contact')) {
          setError({
            message: 'You must agree to the privacy policy',
            status: '400',
          })
          return
        } else if (formFromProps.contact) {
          let agreement = ''
          agreement += `ID: ${'PRIVOLA-CONTACT-' + formID + '-' + Date.now()};`
          agreement += `Date and Time: ${new Date().toISOString()};`
          agreement += `IP Address: ${ipAddress};`
          agreement += `User Agent: ${navigator.userAgent};`
          agreement += `Channel: web;`
          agreement += `Status: active;`
          agreement += `Agreement: ${dataToSend.find((item) => item.field === 'privacyPolicy')?.value ? 'Accepted' : 'Rejected'};`
          agreement += 'Agreement for Contact;'

          dataToSend.push({
            field: 'agreementForContact',
            value: agreement,
          })
        }

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            const errorMessage =
              (typeof res === 'object' &&
                res !== null &&
                'errors' in res &&
                Array.isArray((res as any).errors) &&
                (res as any).errors[0]?.message) ||
              'Internal Server Error'

            const errorStatus =
              (typeof res === 'object' && res !== null && 'status' in res && (res as any).status) ||
              req.status?.toString()

            setError({
              message: errorMessage,
              status: errorStatus,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="lg:max-w-4xl flex-shrink-0 w-full">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form
              id={formID}
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(onSubmit)(e)
              }}
              className="flex flex-col"
            >
              <div className="mb-4 last:mb-0 grid grid-cols-10 gap-4 mt-2 gap-y-6">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]

                    console.log((field as any).width, field.blockType)
                    if (Field && field.blockType !== 'message') {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'w-full col-span-10',
                            field.width
                              ? (() => {
                                  if (field.width <= 10) {
                                    return `md:col-span-1`
                                  } else if (field.width <= 20) {
                                    return `md:col-span-2`
                                  } else if (field.width <= 30) {
                                    return `md:col-span-3`
                                  } else if (field.width <= 40) {
                                    return `md:col-span-4`
                                  } else if (field.width <= 50) {
                                    return `md:col-span-5`
                                  } else if (field.width <= 60) {
                                    return `md:col-span-6`
                                  } else if (field.width <= 70) {
                                    return `md:col-span-7`
                                  } else if (field.width <= 80) {
                                    return `md:col-span-8`
                                  } else if (field.width <= 90) {
                                    return `md:col-span-9`
                                  }
                                })()
                              : '',
                          )}
                        >
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    } else if (field.blockType === 'message') {
                      return (
                        <div key={index} className="col-span-10">
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                {formFromProps.privacyPolicy &&
                  (() => {
                    const Field: React.FC<any> = fields?.['checkbox']
                    return (
                      <div className="col-span-10">
                        <Field
                          name="privacyPolicy"
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          label={t('privacyPolicyCheckboxLabel')}
                          required
                        />
                      </div>
                    )
                  })()}
                {formFromProps.contact &&
                  (() => {
                    const Field: React.FC<any> = fields?.['checkbox']
                    return (
                      <div className="col-span-10">
                        <Field
                          name="contact"
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          label={t('contactCheckboxLabel')}
                          required
                        />
                      </div>
                    )
                  })()}
                {formFromProps.newsletter &&
                  (() => {
                    const Field: React.FC<any> = fields?.['checkbox']
                    return (
                      <div className="col-span-10">
                        <Field
                          name="newsletter"
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          label={t('newsletterCheckboxLabel')}
                        />
                      </div>
                    )
                  })()}
                {formFromProps.marketing &&
                  (() => {
                    const Field: React.FC<any> = fields?.['checkbox']
                    return (
                      <div className="col-span-10">
                        <Field
                          name="marketing"
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          label={t('marketingCheckboxLabel')}
                        />
                      </div>
                    )
                  })()}
                {formFromProps.termsAndConditions &&
                  (() => {
                    const Field: React.FC<any> = fields?.['checkbox']
                    return (
                      <div className="col-span-10">
                        <Field
                          name="termsAndConditions"
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                          label={t('termsAndConditionsCheckboxLabel')}
                          required
                        />
                      </div>
                    )
                  })()}
              </div>

              <Button form={formID} type="submit" variant="default" className="ml-auto">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
