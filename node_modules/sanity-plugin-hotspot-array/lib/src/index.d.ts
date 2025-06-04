/// <reference types="react" />

import {ArrayOfObjectsInputProps} from 'sanity'
import {ComponentType} from 'react'
import {ObjectSchemaType} from 'sanity'
import {Plugin as Plugin_2} from 'sanity'
import {RenderPreviewCallback} from 'sanity'

export declare type HotspotItem<
  HotspotFields = {
    [key: string]: unknown
  }
> = {
  _key: string
  _type: string
  x: number
  y: number
} & HotspotFields

export declare interface HotspotTooltipProps<
  HotspotFields = {
    [key: string]: unknown
  }
> {
  value: HotspotItem<HotspotFields>
  schemaType: ObjectSchemaType
  renderPreview: RenderPreviewCallback
}

export declare function ImageHotspotArray(
  props: ArrayOfObjectsInputProps<HotspotItem> & {
    imageHotspotOptions: ImageHotspotOptions
  }
): JSX.Element

export declare const imageHotspotArrayPlugin: Plugin_2<void>

export declare interface ImageHotspotOptions<
  HotspotFields = {
    [key: string]: unknown
  }
> {
  pathRoot?: 'document' | 'parent'
  imagePath: string
  descriptionPath?: string
  tooltip?: ComponentType<HotspotTooltipProps<HotspotFields>>
}

export {}

declare module '@sanity/types' {
    interface ArrayOptions {
        imageHotspot?: ImageHotspotOptions;
    }
}