import RichText from '@/components/frontend/richtext'
import { AboutUsBlock as AboutUsBlockType, Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

export const AboutUsBlock: React.FC<AboutUsBlockType> = (block) => {
  const {
    backgroundImage,
    title,
    subtitle,
    firstText,
    stats,
    story,
    people,
    values,
    missionAndVision,
    howWeWork,
    partnershipModels,
    ourTeam,
    certificates,
    certificatesTitle,
  } = block

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-[60vh] relative overflow-hidden flex flex-col justify-end items-center flex-1 pb-10 lg:items-start">
        <Image
          src={(backgroundImage as Media)?.url}
          alt={title}
          className="w-full h-full object-cover -z-10 object-center absolute top-0 left-0"
          width={(backgroundImage as Media)?.width}
          height={(backgroundImage as Media)?.height}
          quality={80}
          sizes="100vw"
        />
        <div className="container flex flex-col gap-4 xl:px-20">
          <h1 className="text-5xl font-medium text-white text-center leading-tight lg:text-left xl:text-6xl">
            {title}
          </h1>
          <h2 className="text-xl text-white text-center leading-relaxed lg:text-left">
            {subtitle}
          </h2>
        </div>
      </div>
      <div className="container xl:px-20 py-12">
        <h2 className="text-4xl leading-tight">{firstText}</h2>
      </div>
      <div className="conatiner h-px bg-accent-foreground"></div>
      {stats ? (
        <div className="container xl:px-20 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-2 items-center">
                {stat.value ? <h3 className="text-3xl mb-2">{stat.value}</h3> : null}

                {stat.label ? (
                  <h3 className="text-2xl font-medium mb-2 max-w-1/2 text-center lg:max-w-none">
                    {stat.label}
                  </h3>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="w-full container xl:px-20 [&_h2]:text-4xl [&_h2]:font-normal lg:[&_h2]:text-5xl my-12">
        <div className="hidden lg:flex lg:float-right flex-row gap-4 ml-8 mb-4 mt-1">
          {people.map((p) => {
            return (
              <div key={''} className="max-w-[220px] flex flex-col">
                <Image
                  src={(p.image as Media)?.url ?? ''}
                  alt={p.name ?? ''}
                  className="w-full h-auto object-cover mb-4"
                  width={(p.image as Media)?.width}
                  height={(p.image as Media)?.height}
                  quality={80}
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
                <div className="text-lg font-semibold text-center">{p.name}</div>
                <div className="text-base text-muted-foreground text-center whitespace-normal">
                  {p.title}
                </div>
              </div>
            )
          })}
        </div>
        <RichText data={story} withoutWrapper className="" />
        <div className="lg:hidden flex flex-row gap-6 mb-4 mt-10">
          {people.map((p) => {
            return (
              <div key={p.name + p.title} className="flex-1">
                <Image
                  src={(p.image as Media)?.url ?? ''}
                  alt={p.name ?? ''}
                  className=" h-auto object-cover mb-2"
                  width={(p.image as Media)?.width}
                  height={(p.image as Media)?.height}
                  quality={80}
                  sizes="(max-width: 1024px) 50vw, 15vw"
                />
                <div className="text-lg font-semibold text-center">{p.name}</div>
                <div className="text-base text-muted-foreground text-center whitespace-normal">
                  {p.title}
                </div>
              </div>
            )
          })}
        </div>
        <div className="clear-both"></div>
      </div>
      <div className="container xl:px-20 py-12 flex flex-col gap-6">
        <h2 className="text-4xl leading-tight mb-6 xl:text-5xl">{values.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {values.valuesList?.map((value) => (
            <div key={value.title} className="flex flex-col gap-2 items-start">
              <Image
                src={(value.icon as Media)?.url ?? ''}
                alt={value.title ?? ''}
                className="h-10 w-auto mb-2"
                width={(value.icon as Media)?.width}
                height={(value.icon as Media)?.height}
                quality={80}
              />
              <h3 className="text-2xl leading-tight font-medium">{value.title}</h3>
              <p className="text-lg text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container xl:px-20 py-12 flex flex-col gap-6 lg:flex-row lg:gap-12">
        <div>
          <h2 className="text-4xl leading-tight mb-6 xl:text-5xl">
            {missionAndVision.mission.title}
          </h2>
          <p className="text-lg text-muted-foreground">{missionAndVision.mission.description}</p>
        </div>
        <div>
          <h2 className="text-4xl leading-tight mb-6 xl:text-5xl">
            {missionAndVision.vision.title}
          </h2>
          <p className="text-lg text-muted-foreground">{missionAndVision.vision.description}</p>
        </div>
      </div>
      <div className="container xl:px-20 py-12">
        <h2 className="text-4xl leading-tight mb-10 xl:text-5xl">{howWeWork.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-y-6">
          {howWeWork.steps?.map((step, index) => (
            <div key={step.title + index} className="flex flex-col gap-2 items-start">
              <h3 className="text-2xl leading-tight font-medium">
                {index + 1}. {step.title}
              </h3>
              <p className="text-lg text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container xl:px-20 py-12">
        <h2 className="text-4xl leading-tight mb-10 xl:text-5xl">{partnershipModels.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-x-12 lg:gap-y-10">
          {partnershipModels.models?.map((model, index) => (
            <>
              <h3 className="text-2xl leading-tight font-medium">{model.title}</h3>
              <p className="text-lg text-muted-foreground lg:col-span-2">{model.description}</p>
            </>
          ))}
        </div>
      </div>
      <div className="container xl:px-20 py-12">
        <h2 className="text-4xl leading-tight mb-10 xl:text-5xl">{ourTeam.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 gap-y-10 lg:gap-y-6">
          {ourTeam.members?.map((member, index) => (
            <div key={member.name + index} className="flex flex-col gap-2">
              <Image
                src={(member.image as Media)?.url ?? ''}
                alt={member.name ?? ''}
                className="w-full h-auto object-cover mb-2"
                width={(member.image as Media)?.width}
                height={(member.image as Media)?.height}
                quality={80}
                sizes="(max-width: 1024px) 50vw, 10vw"
              />
              <h3 className="text-xl leading-tight font-medium">{member.name}</h3>
              <p className="text-base text-muted-foreground">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container xl:px-20 py-12">
        <h2 className="text-4xl leading-tight mb-10 xl:text-5xl">{certificatesTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 gap-y-10 lg:gap-y-6">
          {certificates.map((certificate, index) => (
            <div key={certificate.certificateTitle + index} className="flex flex-col gap-2">
              <Image
                src={(certificate.certificateImage as Media)?.url ?? ''}
                alt={certificate.certificateTitle ?? ''}
                className="w-full h-auto object-cover mb-2"
                width={(certificate.certificateImage as Media)?.width}
                height={(certificate.certificateImage as Media)?.height}
                quality={80}
                sizes="(max-width: 1024px) 50vw, 10vw"
              />
              <h3 className="text-xl leading-tight font-medium">{certificate.certificateTitle}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
