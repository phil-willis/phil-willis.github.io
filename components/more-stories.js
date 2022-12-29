import PostPreview from '../components/post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <div
        className="grid 
          grid-cols-1 
          gap-y-10 

          md:grid-cols-2 
          md:gap-x-16 
          md:gap-y-16 

          lg:grid-cols-2
          lg:gap-x-32 
          mb-32

          xl:grid-cols-3
          "
      >
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
