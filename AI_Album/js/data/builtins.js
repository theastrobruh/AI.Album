/**
 * js/data/builtins.js
 * Static definitions for the 4 built-in free prompts.
 * These are seeded once per profile on first load.
 */

const BUILTIN_PROMPTS = [
    {
        id:     'builtin_regen',
        title:  'Re-Gen / Upscale',
        tags:   ['Tools', 'Upscaling'],
        model:  'Universal',
        builtin: true,
        prompt: `Re-generate the provided image at a higher resolution and pixel density while maintaining 100% fidelity to the original image. Do not modify, reinterpret, add, remove, crop, or stylize any element.

Strictly preserve:
- Original composition, framing, and aspect ratio
- Exact camera angle and perspective
- Identical colors, tones, contrast, and color grading
- Original lighting direction, intensity, and softness
- Exact outfit, pose, body proportions, and facial features
- Background elements, textures, and depth
- Overall aesthetic, mood, and visual intent

The only allowed operation is:
- Increase resolution, sharpness, and micro-detail
- Improve texture clarity, edge definition, and fine details
- Reduce compression artifacts or noise without smoothing or altering surfaces

The final result must look like the same image, captured with a higher-resolution sensor — no creative interpretation, no corrections, no enhancements beyond pixel clarity.`
    },
    {
        id:     'builtin_outpaint',
        title:  'Outpaint',
        tags:   ['Tools', 'Outpaint'],
        model:  'Universal',
        builtin: true,
        prompt: `Extend the edges of the image to create a larger scene while maintaining the original style, perspective, colors, lighting, and textures. Add natural and seamless background or environmental elements that perfectly match the existing photo. The expansion must look invisible and coherent with the original framing. Photorealistic, high-resolution result with natural lighting, realistic textures, and authentic visual continuity.`
    },
    {
        id:     'builtin_portrait',
        title:  'Face Portrait (BLACK BG)',
        tags:   ['Modeling', 'Portrait'],
        model:  'Nano Banana',
        builtin: true,
        prompt: `Centered face mug shoot with the exact face features (hairstyle and eyes color) and same exact expression (looking toward the camera). Captured from a frontal angle. With a sharp and clean details. Pitch-black background. PRO MODE PHOTOGRAPHY: Nikon Z7II + Sigma 50MM SS: 1/1250 | F:1.2 | ISO:100.`
    },
    {
        id:     'builtin_fullbody',
        title:  'Full Body (BLACK BG)',
        tags:   ['Modeling', 'Full Body'],
        model:  'Nano Banana',
        builtin: true,
        prompt: `Full-body portrait standing confidently barefoot. Standing naturally, facing the spectator. Her gaze is directed at the spectator, maintaining the exact same expression as in the reference. Arms resting naturally at her sides.

- Details of the Character and Characteristics: Preserve all physical features exactly as in the reference (VERY IMPORTANT). Must be accurate and realistic: features, accessories, and natural proportions. Realistic soft-looking skin, with real texture and lifelike detail.

- Outfit: Outfit must be preserved exactly as in the reference. Barefoot with pretty feminine toes and adorned with natural nails polish. Ensure fabric details and accessories are reproduced faithfully.

- Scene and Composition: Seamless pitch-black background (no shadows, reflections, or gradients). The subject must be perfectly isolated, centered, and balanced. Clean and distraction-free presentation — the woman is the only visual element. Lighting must be even, soft, and realistic, highlighting skin tones, fabric details, and natural textures without casting shadows on the background.`
    }
];
