import React from 'react';
import Link from 'next/link';

export const DropdownLink = (props) => {
    let { href, children, ...rest } = props;

  return (
    <Link href={href}>
        <span {...rest}>{children}</span>
    </Link>
  )
}
