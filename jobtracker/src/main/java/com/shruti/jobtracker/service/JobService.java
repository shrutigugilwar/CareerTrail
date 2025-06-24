package com.shruti.jobtracker.service;

import com.shruti.jobtracker.model.Job;
import com.shruti.jobtracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepo;

    public Job addJob(Job job) {
        return jobRepo.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public Job updateJob(Long id, Job job) {
        Job existing = jobRepo.findById(id).orElseThrow();
        existing.setJobTitle(job.getJobTitle());
        existing.setCompanyName(job.getCompanyName());
        existing.setAppliedDate(job.getAppliedDate());
        existing.setStatus(job.getStatus());
        existing.setResumeLink(job.getResumeLink());
        return jobRepo.save(existing);
    }

    public void deleteJob(Long id) {
        jobRepo.deleteById(id);
    }
}
