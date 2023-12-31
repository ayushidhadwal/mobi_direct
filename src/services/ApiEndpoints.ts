export const ApiEndpoints = {
  auth: {
    login: '/api/login',
    checkAvailableEmail: '/api/verify-email',
    register: '/api/register',
    forgotPassword: '/api/forget-password',
    resetPassword: '/api/reset-password',

    verifyLogin: '/api/verify-otp',
  },
  engineOilTypes: {
    get: '/api/get-engine-oil-type',
  },
  vehicle: {
    get: '/api/get-vehicles',
    add: '/api/add-vehicles',
    update: '/api/update-vehicles',
    delete: '/api/delete-vehicles',
  },
  address: {
    get: '/api/get-user-address',
    add: '/api/add-user-address',
    update: '/api/update-user-adress',
    delete: '/api/delete-address',
  },
  profile: {
    get: '/api/get-user-profile',
    update: '/api/update-user-profile',
    updatePassword: '/api/change-password',
    updateUserMobileGetOTP: '/api/send-otp-change-mobile',
    updateFcmToken: '/api/fcm-token',
  },
  notifications: {
    get: '/api/get-user-notification',
  },
  discountCoupons: {
    get: '/api/get-coupon',
    apply: '/api/apply-coupon',
  },
  referral: {
    get: '/api/get-qr-code',
  },
  order: {
    get: '/api/get-orders',
    getDetails: '/api/get-order-details/[ORDER_ID]',
    addOn: {
      get: '/api/add-on',
      addToCart: '/api/add-to-cart-product',
    },
    service: {
      addToCart: '/api/add-to-cart',
      getEngineOils: '/api/get-engine-oil',
      getOilFilters: '/api/get-oil-filter',
      getLastService: '/api/get-last-service',
      getUpcomingService: '/api/get-upcoming-service',
    },
    cart: {
      get: '/api/get-cart',
      updateCart: '/api/update-cart-qty',
      deleteCart: '/api/delete-cart/[CART_ID]',
      getSummary: '/api/get-orders-summary',
      createOrder: '/api/create-order',
    },
  },
  appointment: {
    getOrderVehicle: '/api/get-order-vehicles',
    availableSlots: '/api/get-available-slots',
    getOrderCode: '/api/get-orders-number',
    appointmentDetails: '/api/appointment-details',
    createAppointment: '/api/create-appointment',
    appointmentList: '/api/get-appointment-list',
    pendingAppointmentDetails:
      '/api/pending-appointment-details/[APPOINTMENT_ID]',
    getWorkShopList: '/api/get-workshops_list',
    getAppointmentForReview: '/api/get-last-unrated-completed-order',
    rescheduleAppointment: '/api/update-expired-appointment',
  },
  history: {
    getHistoryVehicles: '/api/get-appointment-vehicles',
    getHistory: '/api/get-complete-appointment-list',
    details: '/api/get-complete-appointment-details/[HISTORY_ID]',
    addReview: '/api/send-feedback',
  },
  agent: {
    getPendingRequests: '/api/pending-appointment-list',
    getPendingRequestDetails:
      '/api/agent-pending-appointment-details/[REQUEST_ID]',
    startPendingRequest: '/api/appointment-start',
    endPendingRequest: '/api/appointment-finish',
    getCompletedRequests: '/api/get-agent-complete-appointment-list',
    getCompletedRequestDetails:
      '/api/get-agent-complete-appointment-details/[REQUEST_ID]',
    getNotifications: '/api/get-agent-notification',
  },
  paymentGateway: {
    webview: '/api/create-payment',
    getTransactions: '/api/user-txn-list',
  },
  faq: {
    getFaqList: '/api/faq',
  },
  contact: {
    getContact: '/api/contact',
  },
  banner: {
    getBannerList: '/api/banner',
  },
  payment: {
    cardDetails: '/api/create-stripe-payment',
    getPaymentSheetParams: '/api/new-create-stripe-payment',
    verifyPayment: '/api/complete-order-stripe-payment',
  },
  deleteAccount: '/api/delete-user',
};
