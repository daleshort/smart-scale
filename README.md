#Smart Scale
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"gradient":"vivid-cyan-blue-to-vivid-purple","width":75,"align":"center","style":{"border":{"radius":"0px"}}} -->
<div class="wp-block-button aligncenter has-custom-width wp-block-button__width-75"><a class="wp-block-button__link has-vivid-cyan-blue-to-vivid-purple-gradient-background has-background" href="https://programmerd.com/scale/" style="border-radius:0px" target="_blank" rel="noreferrer noopener"><strong>Live Demo</strong></a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:spacer {"height":"22px"} -->
<div style="height:22px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:media-text {"mediaId":472,"mediaType":"image","mediaWidth":65} -->
<div class="wp-block-media-text alignwide is-stacked-on-mobile" style="grid-template-columns:65% auto"><figure class="wp-block-media-text__media"><img src="https://mechied.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-30-at-2.01.12-PM-500x344.png" alt="" class="wp-image-472 size-full"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph {"placeholder":"Content…"} -->
<p>I got a little too snack happy during Recurse so I wanted to be more aware of what I was eating. I created Smart Scale to help me calculate the total nutritional information of a recipe as I cook by connecting my kitchen scale to a web interface.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:media-text -->

<!-- wp:spacer {"height":"15px"} -->
<div style="height:15px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:paragraph -->
<p>I hacked a kitchen scale from Amazon to embed an ESP8266 IoT development board and programmed the board to send the weight reading via MQTT to a broker on my droplet server.  Then I made a React page where you interactively search for foods in a database and select one to use as your current ingredient.  The page automatically gets the scale weight data from MQTT (or fakes the data if you're not logged in with the proper credentials).  If you don't find what you want, or want to edit the nutritional information, you can update the database, which is written in Python using Django.  The page also calculates the total and average nutritional info for the recipe and you can divide the information by the number of servings.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I also wanted to better understand authentication (after using JSON web tokens in my <a href="https://mechied.com/index.php/portfolio/fulcrum-focus/" data-type="portfolio" data-id="415">Fulcrum Focus</a> app) so I integrated <a href="https://auth0.com/" data-type="URL" data-id="https://auth0.com/">Auth0</a> as an authentication provider.  I created an authentication scheme for three different types of users: unauthenticated users who can only view the main food database, authenticated users who can view the main database and add user specific custom foods, and administrators, who can view and edit all foods.  The backend API endpoints are protected with token authentication and Auth0 scopes are used to grant administrator privileges.  The frontend queries the backend to determine the user's access level and then tailors front end elements like disabling buttons and displaying tooltips.  Implementing this efficiently required using advanced React concepts like async, hooks, routers, and context.  The code is posted to my github <a href="https://github.com/daleshort/smart-scale">here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:embed {"url":"https://www.youtube.com/watch?v=YvU_H9ExAd4","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
https://www.youtube.com/watch?v=YvU_H9ExAd4
</div></figure>
<!-- /wp:embed --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Here is my demonstration of the Smart Scale I gave during Friday Demos at Recurse Center.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:image {"align":"center","id":473,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image aligncenter size-large"><img src="https://mechied.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-30-at-2.01.31-PM-500x344.png" alt="" class="wp-image-473"/><figcaption>Modal</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"align":"center","id":474,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image aligncenter size-large"><img src="https://mechied.com/wp-content/uploads/2022/08/Screen-Shot-2022-08-30-at-2.04.32-PM-319x500.png" alt="" class="wp-image-474"/><figcaption>Mobile Layout</figcaption></figure>
<!-- /wp:image -->
