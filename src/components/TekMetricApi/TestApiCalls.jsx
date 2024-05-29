

const TestApiCalls = async () =>
{
  //                            NEW API CALL

  // ==============================GET BEARER ACCES TOKEN FOR FUTURE API CALLS
  //POST request to get token info
  const getToken = async () =>
  {
    const credentials = `${ process.env.TEKMETRIC_CLIENT_ID }:${ process.env.TEKMETRIC_CLIENT_SECRET }`

    const base64 = btoa(credentials)

    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/oauth/token?grant_type=client_credentials`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${ base64 }`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })

    const data = await res.json()
    return data
  }

  // set token info to ${token}
  const token = await getToken()
  // console.log(token)
  //Set accessToken for further API calls
  const accessToken = token.access_token
  // ==============================GET BEARER ACCES TOKEN FOR FUTURE API CALLS

  //                            NEW API CALL

  // ========================================GET ALL SHOP DETAILS
  // Get all shops - if you want single shop URL + /:shopId

  // THIS RETURNS AN ARRAY OF SHOPS THAT YOUR BEARER TOKEN HAS BEEN AUTHORIZED FOR
  // IM GUESSING WE NEED TO GET AUTHORIZATION PER SHOP THAT WANTS TO USE TEKMETRIC
  const getAllShops = async () =>
  {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/shops`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    })

    const data = await res.json()
    return data
  }

  const allShops = await getAllShops()
  // console.log(allShops)
  // ========================================GET ALL SHOP DETAILS

  //                            NEW API CALL

  // ======Returns a list of all customers filtered by the provided search parameters.
  //MUST USE ONE SEARCH PARAM 

  // HEADERS
  // Content-Type:	application/json
  // Authorization:	Bearer access_token


  // SEARCH PARAMS 
  // TYPE       KEY               VALUE 
  // integer    shop              Search for customers by shop
  // String     search            Search for customers by their name, email, or phone number
  // Boolean    okForMarketing    Boolean	Filter By customers who are ok for marketing
  // Date       updatedDateStart  Date	Filter by customer updated date
  // Date       updatedDateEnd    Date	Filter by customer updated date
  // Date       deletedDateStart  Date	Filter by customer deleted date
  // Date       deletedDateEnd    Date	Filter by customer deleted date
  // String     sort              Specify the property you'd like to sort on.
  //                              You can specify multiple sort parameters
  //                              i.e. "lastName,firstName"
  //                              Permitted Values: [ lastName, firstName, email ] 
  // String     customerTypeId    Search by Customer type
  //                              Permitted Values: [ 1 - (Customer), 2 - (Business) ] 
  // String     sortDirection     Determine the direction you want to sort your results
  //                              Permitted Values: [ ASC, DESC ] 
  // integer    size              Integer	Specify the number of results you would like returned
  // integer    page              Integer	Specify the page of results you would like returned

  // RESPONSE 
  // RETURNS AN ARRAY OF CUSTOMERS BASED ON SEARCH PARAMS
  // [
  //   {
  //     id: 498803,
  //     firstName: 'Birdeye',
  //     lastName: '',
  //     email: 'aman.agarwal@gmail.com',
  //     phone: [ Array ],
  //     address: [ Object ],
  //     notes: '',
  //     customerType: [ Object ],
  //     contactFirstName: 'Aman',
  //     contactLastName: 'Agarwal',
  //     shopId: 238,
  //     okForMarketing: true,
  //     createdDate: '2023-12-13T13:04:31Z',
  //     updatedDate: '2023-12-13T13:04:31Z',
  //     deletedDate: null,
  //     birthday: '2000-12-11'
  //   },
  // ]

  // TO GET A SINGLE CUSTOMER BY ID ADD /:customerId TO URL
  // { DONT USE SEARCH PARAMS IF GETTING SINGLE CUSTOMER BY ID }

  const getCustomer = async () =>
  {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/customers?shop=${ token.scope }`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    })

    const data = await res.json()
    return data
  }

  const customer = await getCustomer()
  // console.log(customer)
  // ======Returns a list of all customers filtered by the provided search parameters.

  //                            NEW API CALL

  // ===============================CREATE NEW CUSTOMER FOR A SHOP

  // HEADERS
  // Content-Type:	application/json
  // Authorization:	Bearer access_token


  // BODY ATTRIBUTES 
  // REQUIRED     TYPE            KEY                VALUE    
  // true         integer         shopId             Shop Id
  //              String          firstName          First Name 
  // false        Integer         customerTypeId     1: Person, 2: Business
  //              String          lastName           Last Name 
  //              [Strings]       email              Array of email addresses
  //              String          notes              Notes 
  //              [String]        phone              Array of Phone Numbers
  //              {JSON OBJ}      address            {address1, address2, city, state, zip}
  //              Boolean         okForMarketing     Does customer receive marketing

  // RESPONSE OBJECT
  // {
  //   "type": "SUCCESS",
  //   "message": "Customer created",
  //   "data": {
  //     "id": 398340,
  //     "firstName": "John",
  //     "lastName": "Smith",
  //     "email": "test@tekmetric.com",
  //     "phone": [
  //       {
  //         "id": 476665,
  //         "number": "1111111122",
  //         "type": "Mobile",
  //         "primary": true
  //       }
  //     ],
  //     "address": {
  //       "id": 406619,
  //       "address1": "1981 Good Luck Rd.",
  //       "address2": "Hillway Apartments",
  //       "city": "Lanham",
  //       "state": "Maryland",
  //       "zip": "20744",
  //       "fullAddress": "1981 Good Luck Rd. Hillway Apartments, Lanham, Maryland 20744",
  //       "streetAddress": "1981 Good Luck Rd. Hillway Apartments"
  //     },
  //     "notes": "notes",
  //     "customerType": {
  //       "id": 1,
  //       "code": "PERSON",
  //       "name": "Person"
  //     },
  //     "contactFirstName": null,
  //     "contactLastName": null,
  //     "shopId": 1,
  //     "okForMarketing": true,
  //     "createdDate": "2021-06-30T17:42:58.193Z",
  //     "updatedDate": "2021-06-30T17:42:58.193Z",
  //     "deletedDate": null,
  //     "birthday": null
  //   },
  //   "details": {}
  // }

  // TO UPDATE A CUSTOMER USE EXACT SAME BODY KEY VALUE PAIRS
  // METHOD WILL BE PATCH
  // ADD /:customerId TO END OF URL

  const createCustomer = async () =>
  {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ accessToken }`
      },
      // ONLY SHOPID AND FIRSTNAME REQUIRED
      // FOR A MORE DETAILED CUSTOMER PROFILE FILL OUT ALL RELATED FIELDS
      // PASS FIELDS INTO BODY OBJ
      body: JSON.stringify({ shopId: `${ token.scope }`, firstName: 'Anthony' })
    })

    const data = await res.json()
    return data
  }

  const newCustomer = await createCustomer()
  // console.log(newCustomer)


  // ===============================CREATE NEW CUSTOMER FOR A SHOP

  //                            NEW API CALL

  // =============================== GET VEHICLE THROUGH SEARCH PARAMS
  // Returns a list of all vehicles filtered by the provided search parameters

  // HEADERS
  // Authorization:	Bearer access_token


  // SEARCH PARAMS 
  // TYPE       KEY               VALUE 
  // integer    shop              Search for customers by shop
  // String     customerId        Specify a customerId
  //                              receive vehicles for specific customer
  // String     search            Search for customers by their name, email, or phone number
  // Date       updatedDateStart  Date	Filter by customer updated date
  // Date       updatedDateEnd    Date	Filter by customer updated date
  // Date       deletedDateStart  Date	Filter by customer deleted date
  // Date       deletedDateEnd    Date	Filter by customer deleted date
  // String     sort              Specify the property you'd like to sort on.
  //                              You can specify multiple sort parameters
  //                              i.e. "lastName,firstName"
  //                              Permitted Values: [ lastName, firstName, email ] 
  //                              Permitted Values: [ 1 - (Customer), 2 - (Business) ] 
  // String     sortDirection     Determine the direction you want to sort your results
  //                              Permitted Values: [ ASC, DESC ] 
  // integer    size              Integer	Specify the number of results you would like returned
  // integer    page              Integer	Specify the page of results you would like returned

  // RESPONSE OBJECT 
  // RETURNS ARRAY OF VEHICLES BY SEARCH PARAMS 
  // WILL PROBABLY USE TO SEARCH FOR VEHICLES A CUSTOMER HAS 
  // {
  //   "content": [
  //     {
  //       "id": 359093,
  //       "customerId": 258819,
  //       "year": 2006,
  //       "make": "Ford",
  //       "model": "Escape",
  //       "subModel": "XLT",
  //       "engine": "3.0L V6 (1) GAS FI",
  //       "color": "blue",
  //       "licensePlate": "tag-no",
  //       "state": "TX",
  //       "vin": "",
  //       "driveType": "AWD",
  //       "transmission": "Automatic",
  //       "bodyType": "Wagon",
  //       "notes": null,
  //       "unitNumber": null,
  //       "createdDate": "2019-02-27T10:31:59Z",
  //       "updatedDate": "2019-02-28T10:32:28Z",
  //       "deletedDate": "2019-03-28T10:32:28Z"
  //     },
  //     {
  //       "id": 375446,
  //       "customerId": 258819,
  //       "year": 2008,
  //       "make": "Lexus",
  //       "model": "GX470",
  //       "subModel": "Base",
  //       "engine": "4.7L V8 (2UZ-FE) GAS FI",
  //       "color": null,
  //       "licensePlate": "tag-123",
  //       "state": "VA",
  //       "vin": null,
  //       "driveType": "AWD",
  //       "transmission": "Automatic CVT",
  //       "bodyType": "Sport Utility",
  //       "notes": null,
  //       "unitNumber": null,
  //       "createdDate": "2019-02-27T10:31:59Z",
  //       "updatedDate": "2019-02-28T10:32:28Z",
  //       "deletedDate": "2019-03-28T10:32:28Z"
  //     },
  //     {
  //       "id": 517955,
  //       "customerId": 258819,
  //       "year": 2015,
  //       "make": "Ford",
  //       "model": "Fusion",
  //       "subModel": "SE",
  //       "engine": "2.5L L4 (7) GAS FI",
  //       "color": null,
  //       "licensePlate": "tag",
  //       "state": "TX",
  //       "vin": "sample-vin",
  //       "driveType": "FWD",
  //       "transmission": "Manual",
  //       "bodyType": "Sedan",
  //       "notes": null,
  //       "unitNumber": null,
  //       "createdDate": "2019-02-27T10:31:59Z",
  //       "updatedDate": "2019-02-28T10:32:28Z",
  //       "deletedDate": "2019-03-28T10:32:28Z"
  //     }
  //   ],
  //   "pageable": {
  //     "sort": {
  //       "unsorted": false,
  //       "sorted": true,
  //       "empty": false
  //     },
  //     "offset": 0,
  //     "pageSize": 10,
  //     "pageNumber": 0,
  //     "paged": true,
  //     "unpaged": false
  //   },
  //   "totalPages": 1,
  //   "totalElements": 3,
  //   "last": true,
  //   "size": 10,
  //   "number": 0,
  //   "first": true,
  //   "sort": {
  //     "unsorted": false,
  //     "sorted": true,
  //     "empty": false
  //   },
  //   "numberOfElements": 3,
  //   "empty": false
  // }


  // TO GET VEHICLE BY ID
  // ADD /:vehicleId TO END OF URL
  // REMOVE SEARCH PARAMS

  const getVehicles = async () =>
  {
    const searchParams = `shop=${ token.scope }`

    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/vehicles?${ searchParams }`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    })

    const data = await res.json()
    return data
  }

  const vehicles = await getVehicles()
  // console.log(vehicles)

  // =============================== GET VEHICLE THROUGH SEARCH PARAMS

  //                            NEW API CALL

  // =============================== CREATE CUSTOMER VEHICLE (CUSTOMER ID SPECIFIC)

  // HEADERS
  // Content-Type:	application/json
  // Authorization:	Bearer access_token


  // BODY ATTRIBUTES 
  // REQUIRED     TYPE            KEY                VALUE  
  // true         integer         customerId         Customers Id 
  //              integer         year               Year of Vehicle 
  //              string          make               Make of Vheicle 
  //              string          model              Model of Vehicle 
  // false        string          subModel           SubModel of Vehicle
  // false        string          engine             Engine of vehicle 
  // false        string          color              color of vehicle
  // false        string          licensePlate       license plate of vehicle
  // false        string          state              license plate state of vehicle
  // false        string          vin                vin of vehicle
  // false        string          notes              notes of vehicle
  // false        string          unitNumber         unit # for vehicle

  // RESPONSE OBJ 
  // {
  //   "type": "SUCCESS",
  //   "message": "Vehicle created",
  //   "data": {
  //     "id": 548052,
  //     "customerId": 228770,
  //     "year": 2020,
  //     "make": "Nissan",
  //     "model": "Pathfinder",
  //     "subModel": "LSX",
  //     "engine": null,
  //     "color": null,
  //     "licensePlate": "06GUAVB",
  //     "state": "TX",
  //     "vin": null,
  //     "driveType": null,
  //     "transmission": null,
  //     "bodyType": null,
  //     "notes": null,
  //     "unitNumber": null,
  //     "createdDate": "2021-06-30T15:40:15.469Z",
  //     "updatedDate": "2021-06-30T15:40:15.469Z",
  //     "productionDate": null,
  //     "deletedDate": null
  //   }
  // }

  // MUST HAVE CUSTOMER ID
  // WILL NEED TO USE ANOTHER API CALL TO GET CUSTOMER INFO

  // TO UPDATE VEHICLE ADD /:vehicleId TO END OF URL 
  // METHOD IS PATCH
  // BODY IS USED STILL TO SEND DATA
  const createVehicle = async () =>
  {
    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ accessToken }`
      },
      // ONLY SHOPID AND FIRSTNAME REQUIRED
      // FOR A MORE DETAILED CUSTOMER PROFILE FILL OUT ALL RELATED FIELDS
      // PASS FIELDS INTO BODY OBJ
      body: JSON.stringify({
        customerId: newCustomer.data.id,
        year: 2016,
        make: 'Nissan',
        model: 'Pathfinder'
      })
    })

    const data = await res.json()
    return data
  }

  const newVehicle = await createVehicle()
  // console.log(newVehicle)

  // =============================== CREATE CUSTOMER VEHICLE (CUSTOMER ID SPECIFIC)

  //                            NEW API CALL

  // =============================================================== APPOINTMENTS
  // Returns a list of all appointments 
  // filtered by the provided search parameters

  // HEADERS
  // Authorization:	Bearer access_token


  // SEARCH PARAMS 
  // TYPE       KEY               VALUE 
  // integer    shop              Search for appt by shop
  // String     customerId        Specify a customerId for appt
  //                              receive vehicles for specific customer
  // integer    vehicleId         Specify a vehicleId to search appointments
  // Date       start             Specify a start date to filter appointments
  // Date       end               Specify a end date to filter appointments
  // Date       updatedDateStart  Filter by appointment updated date
  // Date       updatedDateEnd    Filter by appointment updated date
  // Boolean    includeDeleted    Filter out deleted appointments
  //                              Default Value: true
  // String     sort              Specify the property you'd like to sort on 
  // String     sortDirection     Determine the direction you want to sort your results
  //                              Permitted Values: [ ASC, DESC ] 
  // integer    size              Integer	Specify the number of results you would like returned
  // integer    page              Integer	Specify the page of results you would like returned

  // RESPONSE OBJECT 
  // {
  //   "content": [
  //     {
  //       "id": 1,
  //       "shopId": 1,
  //       "customerId": 1,
  //       "vehicleId": 2,
  //       "startTime": "2018-02-04T19:54:38",
  //       "endTime": "2018-02-04T20:24:38",
  //       "description": "A/C Smells Funny, Oil leak in driveway, Blinker light is out",
  //       "arrived": null,
  //       "createdDate": "2019-02-27T10:31:59Z",
  //       "updatedDate": "2019-02-28T10:32:28Z",
  //       "deletedDate": null,
  //       "leadSource": null,
  //       "rideOption": null,
  //       "dropoffTime": "2018-02-04T17:00:00",
  //       "pickupTime": "2018-02-04T21:00:00",
  //       "appointmentOption": null
  //     },
  //     {
  //       "id": 2,
  //       "shopId": 1,
  //       "customerId": 1,
  //       "vehicleId": 2,
  //       "startTime": "2018-02-06T17:24:52",
  //       "endTime": "2018-02-06T17:54:52",
  //       "description": "A/C smell, noise on bumps, and ",
  //       "arrived": true,
  //       "createdDate": "2019-02-27T10:31:59Z",
  //       "updatedDate": "2019-02-28T10:32:28Z",
  //       "deletedDate": "2019-02-28T10:32:28Z",
  //       "leadSource": "Drive-By",
  //       "rideOption": {
  //         "id": 3,
  //         "code": "NONE",
  //         "name": "None"
  //       },
  //       "dropoffTime": "2018-02-06T12:00:00",
  //       "pickupTime": "2018-02-04T19:00:00",
  //       "appointmentOption": {
  //         "id": 1,
  //         "code": "STAY",
  //         "name": "Stay With Vehicle"
  //       }
  //     }
  //   ],
  //   "pageable": {
  //     "sort": {
  //       "sorted": true,
  //       "unsorted": false,
  //       "empty": false
  //     },
  //     "offset": 0,
  //     "pageSize": 10,
  //     "pageNumber": 0,
  //     "unpaged": false,
  //     "paged": true
  //   },
  //   "totalElements": 73,
  //   "totalPages": 8,
  //   "last": false,
  //   "size": 2,
  //   "number": 0,
  //   "sort": {
  //     "sorted": true,
  //     "unsorted": false,
  //     "empty": false
  //   },
  //   "first": true,
  //   "numberOfElements": 2,
  //   "empty": false
  // }

  // TO GET SINGLE APPT ADD /:apptId TO URL
  // DONT USE SEARCH PARAMS

  const getAppts = async () =>
  {
    const searchParams = `shop=${ token.scope }`

    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/appointments?${ searchParams }`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ accessToken }`
      }
    })

    const data = await res.json()
    return data
  }

  const appts = await getAppts()
  // console.log(appts)

  // =============================================================== APPOINTMENTS

  //                            NEW API CALL

  // ============================================================CREATE APPT
  // HEADERS
  // Content-Type:	application/json
  // Authorization:	Bearer access_token


  // BODY ATTRIBUTES 
  // REQUIRED     TYPE            KEY                VALUE  
  // true         integer         shopId             Shop Id 
  //              DateTime        startTime          Start time of the appointment 
  //              DateTime        endTime            End time of the appointment
  //              string          title              Title of the appointment 
  // false        integer         customerId         Customer id - not required 
  //                                                 (unless there is vehicle)
  //                                                 by must belong to shopId
  //              integer         vehicleId          Vehicle id - not required
  //                                                 (unless there is customer)
  //                                                 by must belong to customerId.
  //                                                 If customerId is not provided it must 
  //                                                 belong to a customer of the shop. 
  //              string          description        Description
  //              string          color              Color which will be shown with the //
  //                                                 Appointment
  //                                                 Permitted Values: [ red, pink, yellow, 
  //                                                 orange, light green, green, blue, navy, 
  //                                                 lavender, purple ]
  //                                                 Default Value: navy
  //              DateTime        dropoffTime        Vehicle Drop-off time
  //              DateTime        pickupTime         Vehicle Pick-up time
  //              string          rideOption         Ride option for the 
  //                                                 appointments that are DROP
  //                                                 Permitted Values: [ LOANER, RIDE, NONE ]
  //                                                 Default Value: NONE

  // RESPONSE OBJ 
  // {
  //   "type": "SUCCESS",
  //   "message": "Appointment Saved",
  //   "data": 1
  // }

  // TO UPDATE APPT ADD /:apptId TO END OF URL 
  // MUST BE PATCH INSTEAD OF POST

  // TO DELETE APPT ADD /:apptId TO END OF URL 
  // MUST BE DELETE INSTEAD OF POST OR PATCH

  const createAppt = async () =>
  {
    const start = new Date(Date.now())
    const end = start
    end.setTime(end.getTime() + 1000 * 60 * 30)

    const res = await fetch(`${ process.env.NEXT_PUBLIC_TEKMETRIC_URL }/api/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ accessToken }`
      },
      // ONLY SHOPID AND FIRSTNAME REQUIRED
      // FOR A MORE DETAILED CUSTOMER PROFILE FILL OUT ALL RELATED FIELDS
      // PASS FIELDS INTO BODY OBJ
      body: JSON.stringify({
        shopId: `${ token.scope }`,
        startTime: start,
        endTime: end,
        title: 'Appt set by LNM Scheduler'
      })
    })

    const data = await res.json()
    return data
  }

  const newAppt = await createAppt()
  // console.log(newAppt)


  // ============================================================CREATE APPT




  return (
    <div className='TestApiCalls'>
      <h1>Testing</h1>
    </div>
  )
}

export default TestApiCalls