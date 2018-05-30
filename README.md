
Server that responds with JSON

All endpoints are POST req,
  -if the req is successful a JSON object for the obj will be returned
  -if the req is unsuccessful a JSON object containing 'error' key will be returned

Models:
-User       - storing the user account information
  -name                                   - name of the user
  -username                               - username of the account
  -password                               - hashed password of the account

  Associations:
  -GroupUser as 'groupusers'              -information for what group user is a part of
  -GroceryList as 'grocerylists'          -information for authored grocery lists
  -GroceryListItem as 'grocerylistitems'  -information for all purchased groceries

  Endpoints (all POST req) :
  /user/:userID                           -get json of user with userID
  /user/create                            -create user with name, username, password
  /user/signIn                            -checks if user exist, then check if password matches
  /user/search/username/:username -returns user with specified username
  /user/delete/:userID                    -deletes user with id of userID
  /user/update/:userID                    -updates user with id of userID with fields


-Group       - storing the group information that users are part of
  -groupName                              -name of group

  Associations:
  -GroupUser as 'groupusers'              -information for what users this group has
  -GroceryList as 'grocerylists'          -information for grocerylists created in this group

  Endpoints (all POST req) :
  /group/:groupID                          -get json of group with groupID
  /group/create                            -create group with field groupName
  /group/delete/:groupID                    -deletes group with id groupID
  /group/update/:groupID                    -updates group with id groupID with fields groupName

-GroupUser       - pairs user with group
  -groupId                                 -id of group to be paired
  -userID                                  -id of user to be paired

  Associations:
  -User as 'user'                           -JSON of associated user of userId
  -Group as 'group'                         -JSON of associated group of groupId

  Endpoints (all POST req) :
  /groupUser/:groupUserID                      -get json of groupUser with groupUserID
  /groupUser/create                            -create groupUser with groupId and userId, linking them
  /groupUser/delete/:groupUserID               -deletes groupUser with id groupUserID
  /groupUser/update/:groupUserID          -updates groupUser with id groupUserID with fields userID, groupId
  /groupUser/leave/                       -finds groupUser that matches userId and groupId and delete it

-GroceryList       - Information for a GroceryList
  -name                                  - name of the list
  -groupID                               - group that this is created in
  -ownerId                               - user who created it
  -private                               - if the list is private/public

  Associations:
  -Group as 'group'                       -the group that this list was created in
  -User as 'owner'                        -information for who authored this grocery list
  -GroceryListItem as 'groceries'         -all groceries in this list

  Endpoints (all POST req) :
  /groceryList/:groceryListID                    -get json of GroceryList with groceryListID
  /groceryList/create                            -create GroceryList with fields
  /groceryList/delete/:groceryListID             -deletes GroceryList with id of groceryListID
  /groceryList/update/:groceryListID             -updates GroceryList with id of groceryListID with fields


-GroceryList       - Information for an item in the list
  -name                                   - name of the item
  -groceryListId                          - Grocery List that is item belongs to
  -budget                                 - alotted budget for this item
  -purchased                              - if the item was purchased or not
  -priority                               - 1-10 priority of the item

  Associations:
  -User as 'buyer'                        -information for who bought this item
  -GroceryList as 'grocerylist'           -grocery list that this item belongs to

  Endpoints (all POST req) :
  /groceryListItem/:groceryListItemID                -get json of GroceryListItem with groceryListItemID
  /groceryListItem/create                            -create GroceryListItem with fields
  /groceryListItem/delete/:groceryListItemID        -deletes GroceryListItem with id of groceryListItemID
  /groceryListItem/update/:groceryListItemID        -updates GroceryListItem with id of groceryListItemID

.env
  accessSite - give site access to fetch
  example: accessSite="http://groceryx.s3-website-us-east-1.amazonaws.com/"
