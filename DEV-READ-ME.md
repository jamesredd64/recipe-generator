
# TODO:
- [ x ]
## A.  - [ ]  Add jwt authorization
## B.  - [ ]  Add recipe-gen page and make it secured(must be logged in)
## C.  - [ ]  Add email a token or password after user signup to validate email addresses
## D.  - [ ]  Add auto logoff after 10 min using token expire method
## E.  - [ ]  Add Add all code files from recipe-gen app from previous version for gen recipes
## F.  - [ ]  Add css for responsive pages
## G   - [ ]  Add tests




# React CSS Style Codes
## Common CSS-like Properties in React
### Margin and Padding:

### m, mt, mb, ml, mr, mx, my (e.g., mb={4} for margin-bottom)
### p, pt, pb, pl, pr, px, py (e.g., pt={2} for padding-top)

# Width and Height:

### w, h (e.g., w="100%", h="50px")

# Display:
### display (e.g., display="flex")

# Flexbox Properties:
### flex, alignItems, justifyContent, flexDirection, flexWrap (e.g., alignItems="center")

## Font and Text:
### fontSize, fontWeight, textAlign, color, lineHeight (e.g., fontSize="lg")

# Background and Borders:
### bg, border, borderRadius, borderColor, borderWidth (e.g., bg="blue.500")

# Positioning:
### position, top, right, bottom, left (e.g., position="absolute")

# Miscellaneous:
# opacity, overflow, cursor, boxShadow, transition (e.g., cursor="pointer")

Example with Code
Here's how these properties might be used in a React component with Chakra UI:

# Install Promts Summary's

I'll help you implement JWT auth with a 10-minute timeout. We'll need to modify both the backend (Firebase Functions) and frontend code.

First, let's modify `functions/index.js` to include JWT verification and custom claims:

````
```
hello dude
```
````

````javascript path=functions/index.js mode=EDIT

````

This implementation:
1. Creates custom tokens with 10-minute expiration
2. Automatically signs out users after 10 minutes
3. Verifies token expiration on each function call
4. Handles admin and regular user tokens differently
5. Cleans up timeouts properly

To test this:
1. Deploy your functions: `firebase deploy --only functions`
2. Sign in to your application
3. The token will expire after 10 minutes, automatically signing out the user
4. Any API calls after expiration will fail with an authentication error

Remember to handle the authentication errors in your UI components to show appropriate messages to users when they're automatically logged out.
