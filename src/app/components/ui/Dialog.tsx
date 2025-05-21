'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface DialogContextType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}

const DialogContext = createContext<DialogContextType | null>(null);

interface DialogProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: SetStateAction<boolean>) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }

      const newValue = typeof value === 'function' ? value(isOpen) : value;
      onOpenChange?.(newValue);
    },
    [isControlled, onOpenChange, isOpen]
  );

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen, triggerRef, contentRef }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog Components must be within a Dialog Provider');
  }
  return context;
};

type DialogTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => {
    const { setOpen, triggerRef } = useDialog();
    const buttonTriggerRef = useMemo(() => {
      if (ref) {
        return typeof ref === 'function'
          ? (node: HTMLButtonElement) => {
              triggerRef.current = node;
              ref(node);
            }
          : ref;
      }
      return triggerRef;
    }, [ref, triggerRef]);

    return (
      <button
        type="button"
        ref={buttonTriggerRef}
        onClick={() => setOpen(true)}
        className={cn(className)}
        {...props}
      />
    );
  }
);

DialogTrigger.displayName = 'DialogTrigger';

const DialogPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

const DialogClose = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const { setOpen } = useDialog();

    return (
      <button type="button" ref={ref} onClick={() => setOpen(false)} {...props}>
        {children}
      </button>
    );
  }
);

DialogClose.displayName = 'DialogClose';

const DialogOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { open, setOpen, contentRef } = useDialog();
    const [animation, setAnimation] = useState<'open' | 'close' | null>(null);

    const handleBackDrop = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      setAnimation(open ? 'open' : 'close');
    }, [open]);

    if (!open && animation === 'close') return null;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        data-state={animation}
        onClick={handleBackDrop}
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onEscapeKeyDown, ...props }, ref) => {
    const { open, setOpen, contentRef } = useDialog();

    const [animation, setAnimation] = useState<'open' | 'close' | null>(null);

    useEffect(() => {
      setAnimation(open ? 'open' : 'close');

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscapeKeyDown?.(event);
          setOpen(false);
        }
      };

      if (open) document.addEventListener('keydown', handleKeyDown);

      return () => document.addEventListener('keydown', handleKeyDown);
    }, [open, onEscapeKeyDown, setOpen]);

    useEffect(() => {
      if (open && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href],input,textarea,select, [tabindex]:not(tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, [open, contentRef]);

    if (!open && animation === 'close') return null;

    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            contentRef.current = node;
          }}
          role="dialog"
          aria-modal="true"
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            className
          )}
          data-state={animation}
          {...props}
        >
          {children}
          <DialogClose className="absolute right-8 top-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </DialogPortal>
    );
  }
);

DialogContent.displayName = 'DialogContent';

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
DialogTitle.displayName = 'DialogTitle';

type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
