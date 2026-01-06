import type { SVGProps } from 'react'

const MicRounded = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
    {...props}
  >
    <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z" />
    <path d="M6.75 11.5a.75.75 0 0 0-1.5 0A6.76 6.76 0 0 0 11.25 18v2h-2a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-2v-2A6.76 6.76 0 0 0 18.75 11.5a.75.75 0 0 0-1.5 0 5.25 5.25 0 0 1-10.5 0Z" />
  </svg>
)

export default MicRounded
