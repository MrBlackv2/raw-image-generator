import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SdRequest } from '../types/sd-request';

@Injectable({
  providedIn: 'root'
})
export class SdClientService {
  private http = inject(HttpClient);

  txt2img({ prompt, negativePrompt }: { prompt: string, negativePrompt?: string }) {
    const req: SdRequest = {
      enable_hr: false,
      denoising_strength: 0,
      prompt,
      seed: -1,
      batch_size: 1,
      n_iter: 1,
      steps: 30,
      cfg_scale: 7,
      width: 512,
      height: 768,
      restore_faces: true,
      tiling: false,
      negative_prompt: negativePrompt,
      sampler_index: "DPM++ 2M Karras"
    }

    return this.http.post<{ images: string[] }>(environment.sdApiUrl, req, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
