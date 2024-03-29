import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({ title, coverImage, excerpt, slug }) {
  return (
    <div>
      <div className="mb-2">
        <CoverImage slug={slug} title={title} src={coverImage} height={278} width={556} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/learn/${slug}`} href="/learn/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}
