import Image from 'next/image';

export default function Timeline({ items = [] }) {
  return (
    <ol className="relative border-l border-white/10 pl-6 space-y-8">
      {items.map((it) => (
        <li key={it.id} className="">
          <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-white/60" />
          <div className="text-white/60 text-xs">{new Date(it.date).toDateString()}</div>
          <h3 className="text-white text-lg font-medium">{it.title}</h3>
          {it.type === 'image' && it.mediaUrl && (
            <div className="mt-2 overflow-hidden rounded-md glass">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.mediaUrl} alt={it.title} className="w-full" />
            </div>
          )}
          {it.type === 'video' && it.mediaUrl && (
            <video className="mt-2 w-full rounded-md glass" controls src={it.mediaUrl} />
          )}
          {it.description && <p className="text-white/80 mt-2">{it.description}</p>}
          {it.externalUrl && (
            <a className="text-accent-teal underline mt-1 inline-block" href={it.externalUrl} target="_blank" rel="noreferrer">Link</a>
          )}
        </li>
      ))}
    </ol>
  );
}
