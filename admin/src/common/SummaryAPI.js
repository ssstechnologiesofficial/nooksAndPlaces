const backendDomain = 'http://localhost:5000'

const SummaryApi = {
  // For Event
    addEvent: {
      url: `${backendDomain}/api/events`,
      method: 'post',
    },
    getEvent: {
        url: `${backendDomain}/api/events`,
        method: 'get',
      },
      updateEvent: {
        url: `${backendDomain}/api/events/:id`,
        method: 'put',
      },
      deleteEvent: {
        url: `${backendDomain}/api/events/:id`,
        method: 'delete',
      },
      evenetCount: {
        url: `${backendDomain}/api/events`,
        method: 'get',
      },
      
      // For Courses 
      addCourse: {
        url: `${backendDomain}/api/addCourse`,
        method: 'post',
      },
      getCourses: {
          url: `${backendDomain}/api/getCourses`,
          method: 'get',
        },
        updateCourse: {
          url: `${backendDomain}/api/updateCourse/:id`,
          method: 'put',
        },
        deleteCourse: {
          url: `${backendDomain}/api/deleteCourse/:id`,
          method: 'delete',
        },
        CourseCount: {
          url: `${backendDomain}/api/events`,
          method: 'get',
        },
        
        // Admin routes
        loginAdmin: {
          url: `${backendDomain}/api/loginAdmin`,
          method: 'post',
        },
}

    export default SummaryApi