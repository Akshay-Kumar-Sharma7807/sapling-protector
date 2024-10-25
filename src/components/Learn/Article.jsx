import { Image, Stack } from "@mantine/core";
import data from "./articles.json";
import { useParams } from "react-router-dom";

const Article = () => {
  // Assuming you have an array of articles
  const { index } = useParams();
  const articles = data["articles"]
  const article = articles[index];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Stack>
      <h2>{article.headline}</h2>
      <Image src={article.image[0]} alt={article.headline}  />
      <p>{article.articleBody}</p>
    </Stack>
  );
};

export default Article;
