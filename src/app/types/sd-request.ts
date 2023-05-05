export interface SdRequest {
  enable_hr: boolean;
  denoising_strength: number;
  prompt: string;
  styles?: string[];
  seed: number;
  batch_size: number;
  n_iter: number;
  steps: number;
  cfg_scale: number;
  width: number;
  height: number;
  restore_faces: boolean;
  tiling: boolean;
  negative_prompt?: string;
  sampler_index: string;
}
