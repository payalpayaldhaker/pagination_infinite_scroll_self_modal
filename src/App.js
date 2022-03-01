


//import area
import axios from "axios";
import { useEffect,  useState } from "react";
import { Button,  Table } from "react-bootstrap";
import swal from "sweetalert";



  
//functional components
function App(){

  //state ya hook varible
  const [student, setStudent] =useState({ 
    data:[],
    meta:{
        pagination:{ 
            page:"",
            pageCount:"",
            
            pageSize: "",
            total:""       
        
        }
    }
  });
  
 // const [paginationItem,setPaginationItem] = useState([])// Empty Array

  useEffect(()=>{ 
      getStudent();
   // alert('page loaded successfully');
   let scrollFunction =()=>{ 
      // console.log('okokok');
      //console.log(window.pageYOffset);
      console.log(window.scrollY);
      // console.log(window.innerHeight);

        if(window.scrollY  ==  20){ 
         console.log('bottom touchted')
          getStudent((student.meta.pagination.pageCount) +1);
       } 
   }
   console.log(window);
  
    window.addEventListener('scroll',scrollFunction);

  },[])
  
  
  
  //functions
 

  let handleView =(e)=>{ 
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
    var view = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
   // console.log(view);
    
    
  }


  let handleDelete = (e)=>{
    //function chaining
    var tr = e.target.closest('tr');

    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
   // console.log(delid);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(  (willDelete) => {
      if (willDelete) {
       
       //API Call
       try {
          axios.delete(`http://localhost:1337/api/gruops/${delid}`)
          tr.remove();
          swal("Good job!", "data deleted successfuly!", "success");
       } catch (error) {
          console.log(error)
       }
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
  }
  
 
  
  let getStudent = (pageno=1)=>{ 
    console.log('okokokok');
        try {
          fetch(`http://localhost:1337/api/gruops?pagination[page]=${pageno}&pagination[pageSize]=25`) 

          
          
          .then((data)=>{ 
              return data.json();

          }).then((data)=>{ 
              console.log(data);
                 setStudent({ 
                    ...student,
                    data:student.data.concat(data.data),
                    meta:data.meta
                 });
              

                                  
                
          }).catch((errr)=>{ 
              console.log(errr);
          }).finally(()=>{ 

          })
        } catch (error) {
          console.log(error);
        }

  }

  //return statement

  return (
    <>
    <h1 className="text-center ">Read Opreation InfiniteScroll </h1>
    <div className="d-flex justify-content-center" >
      <button onClick={()=>{ getStudent()}} className="btn btn-success mb-5" >family group</button>
    
</div>


      {student.data.length > 0 &&
      <>
              <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Family Group</th>
                  <th>Surname</th>
                  <th>Action</th>
                 
                </tr>
              </thead>
              <tbody>
                { 
                    student.data.map(function(currentValue, index, arr){
                     console.log(currentValue);
                      //console.log(arr[index].id);
                      //console.log(arr[index].attributes.name);
                     console.log(arr[index].attributes.Surname);
                       return( 
                           
                          
                            <tr key={index} >
                                <td>{(arr[index].id)}</td>
                                <td>{(arr[index].attributes.name)}</td>
                                <td>{(arr[index].attributes.Surname)} </td>
                                <td>
                                    <Button variant="success"onClick={(e)=>{ handleView(e)}}  size="sm">View</Button>&nbsp;
                                    <Button variant="primary"  size="sm">Edit</Button>&nbsp;
                                    <Button variant="danger" onClick={(e)=>{ handleDelete(e)}} size="sm">Delete</Button>&nbsp;
  
  
                                </td>
                           
                           </tr>
                           
                      )
                    })
                
                }
                
                
              </tbody>
      </Table >
     
      
      
       
         
    
      
       </>
}

    </>
  );
}

export default App;

