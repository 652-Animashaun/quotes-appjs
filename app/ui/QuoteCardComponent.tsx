import { Card, Text } from "@tremor/react";
import { useState } from "react";
import styles from "./css/QuoteCard.module.css";

type Quote = {
  id: number;
  artist: string;
  artistPicture: string;
  quote: string;
  song: string;
  annotations: string;
  viewCount: number;
  annotationContributor: string;
  annotationUpvotes: number;
};

type QuoteCardProps = {
  quote: Quote;
};

export default function QuoteCard({ quote }: QuoteCardProps) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <div
      key={quote.id}
      className="col-span-12 md:col-span-8"
      onClick={handleToggleDetails}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Card className={`${styles.card}`}>
        <Text
          className={`${styles.textLg} ${styles.hoverBgGreen} ${isTouched ? styles.hoverBgGreen : ""}`}
        >
          {quote.artist}
        </Text>
        <Text
          className={`${styles.text3xl} ${styles.textDark} ${styles.hoverBgGreen} ${isTouched ? styles.hoverBgGreen : ""}`}
        >
          {quote.quote}
        </Text>
        <div className={`col-span-4 gap-12 ${styles.textRight}`}>
          <span className={`${styles.hoverBgGreen} ${isTouched ? styles.hoverBgGreen : ""}`}>-{quote.song}</span>
        </div>
      </Card>
      
      {isDetailsVisible && (
        <div className={styles.details}>
          <img src={quote.image} alt={quote.artist} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          <Text>Annotation: {quote.annotation.annotation}</Text>
          <Text>Views: {quote.annotation.annotation_view_count}</Text>
          <Text>Contributor: {quote.annotation.annotator}</Text>
          <Text>Upvotes: {quote.annotation.upvotes}</Text>
        </div>
      )}
    </div>
  );
}
