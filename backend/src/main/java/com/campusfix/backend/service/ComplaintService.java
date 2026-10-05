package com.campusfix.backend.service;
import com.campusfix.backend.model.Complaint;
import com.campusfix.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ComplaintService {
    private final ComplaintRepository repo;
    public ComplaintService(ComplaintRepository repo){this.repo=repo;}
    public Complaint create(Complaint c){return repo.save(c);}
    public List<Complaint> all(){return repo.findAll();}
    public Complaint updateStatus(Long id,String status){
        Complaint c=repo.findById(id).orElseThrow(); c.setStatus(status); return repo.save(c);
    }
}
