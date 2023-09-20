import styles from "./card.module.css";
import { Pet } from "src/fetsClient";

function Card(pet: Pet) {
  const { name, photoUrls, category } = pet;
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        {category && (
          <div className="flex items-center text-white gap-2">
            <span>
              <b>Category:</b>
            </span>
            <span key={category.id}>{category.name}</span>
          </div>
        )}
        {photoUrls
          ?.filter((url) => !!url && url.includes("http"))
          .map((url) => (
            <img
              key={url}
              src={url}
              alt={name}
              className={styles.image}
              loading="lazy"
            />
          ))}
        <div className={styles.callToActionContainer}>
          <a
            href={`/pet/${pet.id}`}
            target="_blank"
            rel="noreferrer"
            className={styles.callToActionElement}
          >
            See more →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
