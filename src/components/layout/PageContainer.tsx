import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
  headerDescription?: string;
  headerAction?: ReactNode;
  background?: 'default' | 'alternate';
}

export default function PageContainer({
  children,
  headerTitle,
  headerSubtitle,
  headerDescription,
  headerAction,
  background = 'default',
}: PageContainerProps) {
  const bgClass = background === 'default' ? 'bg-[#F7F5F0] dark:bg-[#1A1814]' : 'bg-[#E8E1D5] dark:bg-[#2E2B27]';

  return (
    <div className={`pt-16 min-h-[100dvh] flex flex-col ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 py-16 w-full">
        {(headerTitle || headerSubtitle || headerAction) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              {headerSubtitle && (
                <p className="text-xs font-medium uppercase tracking-widest text-[#B08D57] mb-3">
                  {headerSubtitle}
                </p>
              )}
              {headerTitle && (
                <h1 className="font-display text-4xl font-medium text-[#252525] dark:text-[#F7F5F0]">
                  {headerTitle}
                </h1>
              )}
              {headerDescription && (
                <p className="text-[#777777] mt-2 max-w-2xl">
                  {headerDescription}
                </p>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}
