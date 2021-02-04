from .db import db


class SubCategory(db.Model):
    __tablename__ = "subcategories"

    id = db.Column(db.Integer, primary_key=True)
    subCategoryName = db.Column(db.String(50), nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey(
        "categories.id"), nullable=False)
    items = db.relationship("Item", backref="items.subCategoryId", lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "subCategoryName": self.categoryName,
            "items": [item.to_dict() for item in self.items]
        }
