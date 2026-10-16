import Image from "next/image";

export default function ArchitectureImage({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full rounded-lg border border-border bg-transparent p-4"
        />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border font-mono text-xs text-muted">
          diagram placeholder
        </div>
      )}
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
