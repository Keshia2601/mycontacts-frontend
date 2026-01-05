import api from "../api/axios"

// GET /api/contacts
export const getContacts = () => {
  return api.get("/contacts")
}

// GET /api/contacts/:id
export const getContactById = (id) => {
  return api.get(`/contacts/${id}`)
}

// POST /api/contacts
export const createContact = (data) => {
  return api.post("/contacts", data)
}

// PUT /api/contacts/:id
export const updateContact = (id, data) => {
  return api.put(`/contacts/${id}`, data)
}

// DELETE /api/contacts/:id
export const deleteContact = (id) => {
  return api.delete(`/contacts/${id}`)
}
