from flask import Blueprint, jsonify, session, request
from app.models import User, Item, Color, Weather, Style, Size, Category, SubCategory, Borrowed, db


items_routes = Blueprint('items', __name__)


@items_routes.route('/<category>')
def getCategory(category):
    this_category = Category.query.filter_by(categoryName=category).first()
    print("CATEGORY", this_category.to_dict())
    # return this_category
