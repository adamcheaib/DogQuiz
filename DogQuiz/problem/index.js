"use strict"

/*
KVAR ATT GÖRA:
- Ändra från flera if-statements till Switch-Case.
- Ändra från en bakgrundsbild till en img-element så att storleken är dynamisk.
*/

/**
- Delete All console logs - DONE
- Consistent use of semicolon in the code - DONE
- Move index.js the main folder - DONE
- Fix so that the same breed does not appear as an alternative twice!
- Make so that the size of the fetched image is dynamic based on its original size by using the img-element rather than a background image. - DONE
 */

document.querySelector("#already_or_newAccount").addEventListener("click", css_register_login_change);

document.querySelector("#login_button").addEventListener("click", accountCheck);

document.querySelector(".play_click").addEventListener("click", click_to_play);
