import { ShieldCheck } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
       <ShieldCheck className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6 transition-all" />
      <span className="font-bold text-lg text-foreground group-data-[collapsible=icon]:hidden transition-opacity duration-200">
        Remote Guardian
      </span>
    </div>
  );
}
