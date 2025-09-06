import { useState, useEffect } from "react"
import axios from "axios"

interface Province { id: string; text: string }
interface City { id: string; text: string; province_id: string }
interface District { id: string; text: string; city_id: string }
interface SubDistrict { id: string; text: string; district_id: string }
interface PostalCode { id: string; text: string; sub_district_id: string }


export function useAddress() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([])
  const [postalCodes, setPostalCodes] = useState<PostalCode[]>([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get("/api/provinces")
        setProvinces(data.result)
      } catch (error) {
        console.error("Failed to fetch provinces:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProvinces()
  }, [])

  const fetchCities = async (provinceId: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/cities/${provinceId}`)
      setCities(data.result)
      setDistricts([])
      setSubDistricts([])
      setPostalCodes([])
    } catch (error) {
      console.error("Failed to fetch cities:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDistricts = async (cityId: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/districts/${cityId}`)
      setDistricts(data.result)
      setSubDistricts([])
      setPostalCodes([])
    } catch (error) {
      console.error("Failed to fetch districts:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubDistricts = async (districtId: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/subdistricts/${districtId}`)
      setSubDistricts(data.result)
      setPostalCodes([])
    } catch (error) {
      console.error("Failed to fetch subdistricts:", error)
    } finally {
      setLoading(false)
    }
  }

    const fetchPostalCodes = async (subDistrictId: string, cityId: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/postal-codes/${subDistrictId}?city_id=${cityId}`)
      console.log('Postal code API response:', data)
      setPostalCodes(data.result)
    } catch (error) {
      console.error("Failed to fetch postal codes:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    provinces,
    cities,
    districts,
    subDistricts,
    postalCodes,
    loading,
    fetchCities,
    fetchDistricts,
    fetchSubDistricts,
    fetchPostalCodes,
  }
}
