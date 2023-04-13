import { TypographyWithGradient } from "@/components/shared/header";
import getBlogPosts, { ContenfullBlog } from "@/utils/contentful";
import { Box, Card } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const document = {
  nodeType: "document",
  data: {},
  content: [
    {
      nodeType: "paragraph",
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Hello world!",
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

export default function Post({ blog }: { blog: ContenfullBlog }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 900, width: 900, my: 4, mx: 2 }}>
        <TypographyWithGradient sx={{ m: 4 }} variant="h1">
          {blog.fields.title}
        </TypographyWithGradient>
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt={blog.fields.heroImg.fields.file.description}
          src={blog.fields.heroImg.fields.file.url}
        />
        <Box>
          <Box sx={{ m: 4 }}>{documentToReactComponents(blog.fields.body)}</Box>
        </Box>
      </Card>
    </Box>
  );
}

export async function getStaticPaths() {
  const blogs = await getBlogPosts();
  const slug = blogs.map((blog) => blog.fields.slug);
  return {
    paths: slug.map((slug) => {
      return {
        params: {
          id: slug,
        },
      };
    }),
    fallback: false,
  };
  // Return a list of possible value for id
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const blogs = await getBlogPosts();
  const blog = blogs.filter((blog) => blog.fields.slug === params.id);
  return {
    props: {
      blog: blog[0],
    },
  };

  // Fetch necessary data for the blog post using params.id
}
