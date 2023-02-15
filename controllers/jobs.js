const Jobs = require("../models/Jobs")
const {StatusCodes} = require('http-status-codes')
const {CustomApiError, BadRequest, Unauthentication} = require("../errors/AllError")

const getAllJobs = async (req, res) => { // get all jobs associate to one person
    const jobs = await Jobs.find({createdBy: req.user.userId})
    res.status(200).json({jobs, nbHits: jobs.length})
}

const getJob = async (req, res) => {
    const {user: {userId}, params:{id}} = req
    const jobs = await Jobs.findOne({_id:id, createdBy: userId})
    if(!jobs){
        throw new BadRequest(`Not Found any job with this id`)
    }
    res.status(200).json({jobs})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.OK).json({job})
}

const updateJob = async (req, res) => {
    const {params:{id}, user: {userId}} = req
    const job = await Jobs.findOneAndUpdate({_id: id, createdBy: userId}, req.body, {new:true}).orFail()
    if(!job){ 
        // if(job.err.value.createdBy){
        //     throw new BadRequest(`You not allow to update this Job cause you not a creator`)
        // }
        // throw new BadRequest(`Not Found any job with this id`)
        throw new BadRequest(`Not Found any job with this id`)
    }
    res.status(StatusCodes.OK).json({job}) 
} 

const deleteJob = async (req, res) => {
    const {params:{id}, user: {userId}} = req
    console.log(`${id} ${userId}`);
    const job = await Jobs.findOneAndDelete({_id: id, createdBy: userId})
    if(!job){
        // if(job.err.value.createdBy){
        //     throw new BadRequest(`You not allow to delete this Job cause you not a creator`)
        // }
        // throw new BadRequest(`Not Found any job with this id`)
        throw new BadRequest(`Not Found any job with this id`)  
    }
    const allJobs = await Jobs.find({createdBy: userId})
    res.status(StatusCodes.OK).json({allJobs})
}
module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}