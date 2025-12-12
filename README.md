# ncc-jekyll 
The Northeastern Cave Conservancy's WordPress site, minus the WordPress.

## Deployment
This repository targets github pages. Committs to `main` will be trigger a workflow to build the site and deploy it to github pages.

## Local Debugging
Before committing or merging a PR to `main`, please test your changes locally. In the repository root, run `make` to build `_site`, or `make serve` to build and start jekyll's debugging webserver.

## Common Tasks
### Adding Meeting Minutes or Newsletters
Meeting minutes should be added to [this directory](./assets/documents/minutes) with filenames in the following format - `YYYY-MM-DD_minutes_X.pdf`, starting with the meeting date, where X is the location of the meeting (eg. "Knox, NY", "Virtual Meeting", etc.).

Newsletters should be added to [this directory](./assets/documents/newsletters) with filenames in the following format - `YYYY-MM-DD_vXnY.pdf`, starting with the issuance date, where X is the volume number and Y is the issue number of the volume.

### Modifying Upcoming Events
Upcoming events are presently managed in a YAML file, [upcoming\_events.yml](_data/upcoming_events.yml). The `upcoming_events` list contains events with parameters `name`, `date`, `location_and_time`, and `description`, where `description` is parsed as markdown, and other fields are plain text. See #6 for future improvement discussion.

### Modifying the Officer List / Committee Chairs
Officers are listed in [officers.yml](./_data/officers.yml). When adding an officer, a well-named profile picture may be added to `/assets/images/officers/` and referenced fom `officers.yml`.

Committee chairs are listed in [committee\_list.yml](./_data/committee_list.yml).

### Adding a New Preserve
First, determine a slug for the preseve (eg. `knox`). The `/_preserves` directory contains preserve definitions in YAML front-matter, whereas `/preserves` contains preserve assets (this structure should be changed). `/preserves/$SLUG` should contain a managment plan and map if possible, and an `images` subdirectory containing some nice photos of the preserve. See [knox](./_preserves/knox.md) for example preserve entries and [assets](./preserves/knox) for inspiration.

| Parameter | Type | Description |
|---|---|---|
| title | string | The display title of the preserve (should end in " Preserve". |
| layout | string | Page template - should always be `preserve` |
| permalink | string | The permalink for this page - should be `/preserves/$SLUG/` |
| manager | string | The name of the preserve manager or point of contact. |
| email | string | Contact email for management of this preserve. |
| managementPlanPath | string | If provided, the path to a management plan PDF for this preserve. |
| mapPath | string | If provided, the path to a management plan PDF for this preserve. |
| party.minimum | integer | Minimum required party size for visits. |
| party.maximum | integer | Maximum permissible party size for visits. |
| shortRequirements | list of strings | Short visitor requirements or warnings shown on the [preserves list page](https://necaveconservancy.org/preserves/). |
| topParagraphs | list of strings | Introductory paragraphs shown at the top of the preserve page. |
| longRequirements | list of strings | Long requirements shown on the specific preserve page (in addition to common requirements) |
| imagePaths | list of strings | Paths to images used on the preserve page. |
| winterClosure | boolean | true | Whether Winter closure rules apply. |
| winterClosureText | string | The text explaining seasonal closure rules. |
| special\_use\_groups\_recommended | boolean | True if this preserve is recommended for special use groups, otherwise False. |
| permit\_required | boolean | Whether a permit is required to visit this preserve. |
| redirect\_from | list of strings | Alternative URL paths that should redirect to this permalink (used for legacy site migration).|
