import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  formatINR,
  getCoursesByCategory,
  type Category,
  type Course,
} from "../data/courses";
import { useCart } from "../context/CartContext";
import "./CourseCatalog.css";

type Props = {
  initialCategory?: Category;
};

export function CourseCatalog({ initialCategory = "All" }: Props) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const { addCourse, buyNow } = useCart();

  const courses = useMemo(() => getCoursesByCategory(category), [category]);

  return (
    <div className="catalog" id="catalog">
      <div className="catalog__head">
        <div>
          <p className="products__eyebrow">All Programs</p>
          <h3>Browse YourSkills courses</h3>
          <p className="catalog__lead">
            Filter by category, add to cart, or buy now — everything stays on this site.
          </p>
        </div>
        <p className="catalog__count">
          <strong>{courses.length}</strong> course{courses.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="products__cats" role="tablist" aria-label="Course categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            className={`products__cat${category === cat ? " is-active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          className="catalog__grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              index={i}
              onAdd={() => addCourse(course)}
              onBuy={() => buyNow(course)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CourseCard({
  course,
  index,
  onAdd,
  onBuy,
}: {
  course: Course;
  index: number;
  onAdd: () => void;
  onBuy: () => void;
}) {
  return (
    <motion.article
      className="course-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.4 }}
      style={{ ["--accent" as string]: course.accent }}
    >
      <div className="course-card__top">
        <span className="course-card__cat">{course.category}</span>
        <span className="course-card__level">{course.level}</span>
      </div>
      <h4>{course.title}</h4>
      <p>{course.description}</p>
      <ul className="course-card__tags">
        {course.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="course-card__meta">
        <span>★ {course.rating}</span>
        <span>{course.ratingsCount} ratings</span>
        <span>{course.hours}h</span>
        <span>{course.learners}</span>
      </div>
      <div className="course-card__foot">
        <div className="course-card__price">
          <strong>{formatINR(course.price)}</strong>
          {course.originalPrice && <s>{formatINR(course.originalPrice)}</s>}
        </div>
        <div className="course-card__actions">
          <button type="button" className="course-btn course-btn--ghost" onClick={onAdd}>
            <ShoppingCart size={16} />
            Add to cart
          </button>
          <button type="button" className="course-btn course-btn--solid" onClick={onBuy}>
            <Zap size={16} />
            Buy now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
