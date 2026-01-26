import type {HTMLAttributes, ReactNode} from 'react';

type VisibilityGateProps = HTMLAttributes<HTMLElement> & {
    hidden: boolean;
    children: ReactNode;
};

export function VisibilityGate({
                                   hidden,
                                   children,
                                   style,
                                   ...rest
                               }: VisibilityGateProps) {
    return (
        <div
            aria-hidden={hidden} // Placed first so ...rest, that follows, is the source of true
            {...rest}
            style={{
                visibility: hidden ? 'hidden' : 'visible',
                pointerEvents: hidden ? 'none' : 'auto',
                ...style,
            }}
        >
            {children}
        </div>
    );
}
