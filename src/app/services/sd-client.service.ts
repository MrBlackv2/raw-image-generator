import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Txt2ImageOptions } from '../types/txt2image-options';
import { Txt2ImageRequest } from '../types/txt2image-request';

@Injectable({
  providedIn: 'root'
})
export class SdClientService {
  private http = inject(HttpClient);

  txt2img({ prompt, options }: { prompt: string, negativePrompt?: string, options?: Txt2ImageOptions }) {
    const orientation = options?.orientation ?? 'portrait';
    const body: Txt2ImageRequest = {
      prompt,
      orientation
    };

    return this.http.post<{ images: string[] }>(`${environment.api.hostname}/api/v1/txt2img`, body, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
