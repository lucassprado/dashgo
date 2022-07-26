import { cloneElement, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref: boolean;
}

export function ActiveLink({ children, shouldMatchExactHref, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;
  
  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref && (
    asPath.startsWith(String(rest.href)) ||
    asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'purple.400' : 'gray.50'
      })}
    </Link>
  );
}