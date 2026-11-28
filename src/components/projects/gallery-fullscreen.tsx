"use client";

import Image from "next/image";
import type { RefObject } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Full-screen image view, loaded only when the expand button is pressed. */
export default function GalleryFullscreen({
  list,
  index,
  alt,
  labels,
  step,
  onClose,
  opener,
}: {
  list: string[];
  index: number;
  alt: string;
  labels: { close: string; previous: string; next: string };
  step: (direction: 1 | -1) => void;
  onClose: () => void;
  opener: RefObject<HTMLButtonElement | null>;
}) {
  return (
      <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/90" />
          <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col p-4 md:p-8"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
        >
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-[0.9rem] text-alabaster">
                {alt} {index + 1} / {list.length}
              </Dialog.Title>
              <Dialog.Close className="rounded-sm border border-alabaster/40 p-2 text-alabaster" aria-label={labels.close}>
                <X size={18} aria-hidden />
              </Dialog.Close>
            </div>
            <div className="relative mt-4 flex-1">
              <Image src={list[index]} alt={`${alt} ${index + 1}`} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className="rounded-sm border border-alabaster/40 p-2 text-alabaster">
                <ChevronLeft size={18} className="rtl:-scale-x-100" aria-hidden />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={labels.next} className="rounded-sm border border-alabaster/40 p-2 text-alabaster">
                <ChevronRight size={18} className="rtl:-scale-x-100" aria-hidden />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
  );
}
