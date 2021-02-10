from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items, undo_items
from .categories import seed_categories, undo_categories
from .subcategories import seed_subCategories, undo_subCategories
from .weather import seed_weather, undo_weather
from .styles import seed_styles, undo_styles
from .colors import seed_colors, undo_colors
from .sizes import seed_sizes, undo_sizes
from .borrowed import seed_borrow, undo_borrow
# from .joins import seed_joins, undo_joins

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_borrow()
    seed_sizes()
    seed_categories()
    seed_subCategories()
    seed_styles()
    seed_weather()
    seed_colors()
    seed_items()
    # seed_joins()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_borrow()
    undo_sizes()
    undo_categories()
    undo_subCategories()
    undo_weather()
    undo_styles()
    undo_colors()
    undo_items()
    # undo_joins()
    # Add other undo functions here
