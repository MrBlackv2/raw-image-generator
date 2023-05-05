import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SdRequest } from '../types/sd-request';
import { Txt2ImageOptions } from '../types/txt-2-image-options';

const ALWAYS_NEG = ", youth, young";

@Injectable({
  providedIn: 'root'
})
export class SdClientService {
  private http = inject(HttpClient);

  txt2img({ prompt, negativePrompt, options }: { prompt: string, negativePrompt?: string, options?: Txt2ImageOptions }) {
    const orientation = options?.orientation ?? 'portrait';
    const req: SdRequest = {
      enable_hr: false,
      denoising_strength: 0,
      prompt: options?.promptInclude ? `${prompt}, sexy, beautiful, highly detailed skin, 4K RAW image` : prompt,
      seed: -1,
      batch_size: 1,
      n_iter: 1,
      steps: 30,
      cfg_scale: 7,
      width: orientation === 'portrait' || orientation === 'square' ? 512 : 768,
      height: orientation === 'landscape' || orientation === 'square' ? 512 : 768,
      restore_faces: true,
      tiling: false,
      negative_prompt: options?.negativePromptInclude ? `${negativePrompt}${ALWAYS_NEG}, animated, anime, painting, illustration, deformed` : `${negativePrompt}${ALWAYS_NEG}`,
      sampler_index: "DPM++ 2M Karras"
    }

    return this.http.post<{ images: string[] }>(environment.sdApiUrl, req, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
