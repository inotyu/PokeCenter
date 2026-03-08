import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Pokémon Center'
export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          backgroundColor: '#3B5BA7',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFCB05',
          fontWeight: 'bold',
          borderRadius: '20px',
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
