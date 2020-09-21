'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

// auth
Route.post('auth', 'UserController.auth')
// .middleware('guest')

// customers
Route.resource('customers', 'CustomerController').validator(new Map([
  [['customers.store'], ['StoreCustomer']],
  [['customers.update'], ['UpdateCustomer']]
])).middleware('auth')

// users
Route.resource('users', 'UserController').validator(new Map([
  [['users.store'], ['StoreUser']],
  [['users.update'], ['UpdateUser']]
]))

// products
Route.resource('products', 'ProductController')
Route.group(() => {
  Route.post('products/:id/categories', 'ProductController.storeProductCategories')
  Route.post('products/:id/images', 'ProductController.storeProductImages')
  Route.post('products/:id/customers', 'ProductController.storeCustomerProduct')
})

// categories
Route.resource('categories', 'CategoryController')
Route.group(() => {
  Route.get('categories/:id/products', 'CategoryController.indexCategoryProducts')
})

// orders
Route.resource('orders', 'OrderController')
Route.group(() => {
  Route.post('orders/:orderId/products/:productId', 'OrderController.storeOrderProduct')
  Route.delete('orders/:orderId/products/:productId', 'OrderController.destroyOrderProduct')
})

// images
Route.resource('images', 'ImageController');
