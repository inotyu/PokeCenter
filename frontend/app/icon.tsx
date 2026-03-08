import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Pokémon Center'
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '4px',
        }}
      >
        PC
      </div>
    ),
    {
      ...size,
    }
  )
}
