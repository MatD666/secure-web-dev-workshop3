const locationsService = require("./locations.service")
const Location = require("./locations.model")


jest.mock("./locations.model")

describe("location findall", () => {
    it('sould call model find', async () => {
        Location.find.mockResolvedValue([1,2,3,4])
        expect(await locationsSevice.findAll()).toEqual([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Location Findone', () => {
    it('Sould get a user', () => {
        jest.resetAllMocks()
        const mockLocation = {_id: '63985cd66d2e8465887e711', filmName: 'Jiji la creette'}
        Location.findById.mockResolvedValue(mockLocation )

        expect(async () => await locationsService.findOne('63985cd66d2e8465887e711')).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Location Add',() => {
    it('Should get a location', async () => {
        const mockLocation = {_id: '63985cd66d2e8465887e711', filmName: 'Jiji la creette'}
        Location.insertMany.mockResolvedValue(mockLocation )
        const insertedLocation = await locationsService.Add(mockLocation )
        expect(insertedLocation).toEqual(mockLocation );
        expect(Location.insertMany).toHaveBeenCalledTimes(1)
    })
})

describe('Location Update',() => {
    it('Should get a location', async () => {
        const mockLocation = {_id: '63985cd66d2e8465887e711', filmName: 'Jiji la creette'}
        Location.findOneAndUpdate.mockResolvedValue(mockLocation)
        Location.findById.mockResolvedValue(mockLocation)
        const updatedLocation = await locationsService.Update(mockLocation._id)
        expect(updatedLocation).toEqual(mockLocation);
        expect(Location.findOneAndUpdate).toHaveBeenCalledTimes(1)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Location Del',() => {
    it('Should get a null', async () => {
        const mockLocation = {_id: '63985cd66d2e8465887e711', filmName: 'Jiji la creette'}
        Location.deleteOne.mockResolvedValue(null)
        const deletedLocation = await locationsService.Del(mockLocation ._id)
        expect(deletedLocation).toEqual();
        expect(Location.deleteOne).toHaveBeenCalledTimes(1)
    })
})