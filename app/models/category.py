from .db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    categoryName = db.Column(db.String(50), nullable=False)
    subCategories = db.relationship(
        'SubCategory', backref="subcategories.categoryId", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "categoryName": self.categoryName,
            "subCategories": [subcategory.to_dict() for subcategory in self.subCategories]
        }
