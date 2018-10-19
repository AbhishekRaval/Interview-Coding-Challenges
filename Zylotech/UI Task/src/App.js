import React, {Component} from 'react';
import {
    CustomInput, Alert, Card, CardImg, CardText, CardBody,
    Input, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import './App.css';
import $ from "jquery";


//Designing an Image Search Application

class App extends Component {

    constructor(props) {
        super(props);
        var preloadedImg = [];
        var starwarimages = [
            {
                imageid: 1,
                url: 'https://starwarsblog.starwars.com/wp-content/uploads/2015/11/yoda-the-empire-strikes-back-1536x864-349144518002.jpg',
                name: 'Yoda'
            },
            {
                imageid: 2,
                url: 'https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png/revision/latest/scale-to-width-down/1000?cb=20171231005834',
                name: 'Chewbacca'
            },
            {
                imageid: 3,
                url: 'https://www.sideshowtoy.com/wp-content/uploads/2015/07/star-wars-princess-leia-sixth-scale-hot-toys-feature-902490.jpg',
                name: 'Princess Leia'
            },
            {
                imageid: 4,
                url: 'https://data1.ibtimes.co.in/cache-img-0-450/en/full/565411/1425305138_star-wars-vii-force-awakens-trailer-release.jpg',
                name: 'Luke Skywalker'
            },
            {
                imageid: 5,
                url: 'https://i5.walmartimages.com/asr/ac1ea6b5-1693-4978-9b22-0e617f488ca2_1.843440fe0140b3f0711fc2b9b29147db.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
                name: 'C3PO'
            },
            {
                imageid: 6,
                url: 'https://cdn.shopify.com/s/files/1/0170/5178/products/BB-8_Clean_legal_line_large.jpg?v=1521231558',
                name: 'BB8'
            }
        ]

        if (localStorage.getItem("photoState") != null){
            preloadedImg = JSON.parse(localStorage.getItem("photoState"));
        }
        else
        {
            preloadedImg = starwarimages;
        }

        this.state = {
            searchString: "",
            file_name: "",
            file_url: "",
            images: preloadedImg,
            filteredimages: preloadedImg,
            caption: "",
            counter: 6,
            alertmsg:false,
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
        this.updateURL = this.updateURL.bind(this);
        this.addimages = this.addimages.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.updateCaption = this.updateCaption.bind(this);
        this.clearModal = this.clearModal.bind(this);
        this.deleteimage = this.deleteimage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }


    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    updateURL(ev){
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('#urlImage')] = tgt.val();
        this.setState({
            file_url: tgt.val()
        });
    }

    updateSearch(ev){
        let tgt = $(ev.target);
        var emptyRegex = new RegExp(/^\s+$/);
        let data = {};
        data[tgt.attr('#searchString')] = tgt.val();
        let imageArray = this.state.images;
        let searchstring = tgt.val();
        var filteredImageArray= [];
        var alert = "";
        if(emptyRegex.test(searchstring) || searchstring === "")
        {
            filteredImageArray = imageArray;
            alert=false;

        }
        else{
            filteredImageArray = imageArray.filter(item => item.name.indexOf(tgt.val())>-1);
            if (filteredImageArray.length > 0){
                alert = false;
            }
            else{
                alert = true;
            }
        }

        this.setState({
            searchString: tgt.val(),
            filteredimages: filteredImageArray,
            alertmsg:alert,
        });
    }

    updateCaption(ev){
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('#caption')] = tgt.val();
        this.setState({
            caption: tgt.val()
        });
    }

    clearModal(ev){
        let data = {};
        data[$(ev.target).attr('#imageFile')] = "";
        this.setState({
            caption: "",
            file_url: "",
            file_name: ""
        });
    }

    addimages(){
        var imageArray = this.state.images;
        imageArray.push(
            {
                imageid: this.state.counter+1,
                url: this.state.file_url,
                name: this.state.caption
            }
        )
        this.setState({
            images: imageArray,
            filteredimages: imageArray,
            counter: this.state.counter+1,
            caption: "",
            file_url: "",
            file_name: "",
            modal: !this.state.modal,
            searchString:""
        });
        var userjson = JSON.stringify(imageArray);
        localStorage.setItem("photoState",userjson);
    }

    deleteimage(imgid){
        let imageArray = this.state.images;
        let filteredImageArray = imageArray.filter(item => item.imageid !== imgid);
        this.setState({
            images: filteredImageArray,
            filteredimages: filteredImageArray,
            searchString:""
        });
        var userjson = JSON.stringify(filteredImageArray);
        localStorage.setItem("photoState",userjson);
    }

    //Credits : https://gist.github.com/hartzis/0b77920380736f98e4f9
    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        document.getElementById("uploadFile").value = e.target.value;
        reader.onloadend = () => {
            this.setState({
                file_name: file,
                file_url: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        let $imagePreview = null;
        if (this.state.file_url) {
            $imagePreview = (<img className="imagesCard " src={this.state.file_url} />);
        }
        return <div className="container">
            <div className="row">
                <div className="col-10  align-self-center">
                    <h3 className="text-center">Photo Library</h3>
                </div>
                <div className="col-2 float-right">
                    <button onClick={this.toggle} className="btn btn-lg btn-link"><i
                        className="material-icons md-48">
                        add_circle
                    </i></button>
                </div>
            </div>

            <div className="row mt-1 mb-4">
                <input className="form-control mr-sm-2" type="search" id="searchString" value={this.state.searchString}
                       onChange={this.updateSearch} placeholder="Search" aria-label="Search"/>
                <Alert color="info" className="my-2" isOpen={this.state.alertmsg}>
                    Sorry, No Images found for the search term "{this.state.searchString}"
                </Alert>
            </div>


            <div className="row">
                <div className="card-columns">
                    {this.state.filteredimages.map(image => (
                        <Card key={image.imageid}>
                            <CardImg top width="100%" src={image.url} className="imagesCard" alt="Card image cap"/>
                            <CardBody>
                                <span>
                                    <CardText className="float-left">{image.name}</CardText>
                                    <button className="btn btn-link float-right"
                                            onClick={() => this.deleteimage(image.imageid)}>
                                        <i className="material-icons md-24" >
                                            delete_outline</i></button>
                                </span>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {
                // Dialog Box Handling Image uploading Utilities
            }

            <Modal isOpen={this.state.modal} centered={true} size={"lg"} toggle={this.toggle}
                   className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add photo</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col align-self-center">
                            <div className="row justify-content-center mx-2">
                                {
                                    //source: https://jsfiddle.net/agaust/n4avzhos/
                                }
                                <div className="panel-body">
                                    <div className="input-group">
                                        <input id="uploadFile" className="form-control" placeholder="Choose File" disabled="disabled" />
                                        <div className="input-group-btn">
                                            <div className="fileUpload btn btn-success">
                                                <span><i class="material-icons md-24"> open_in_browser </i></span>
                                                <input type="file" name="file" id="imageFile" onChange={this.handleImageChange} className="upload" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mycontent-left"></div>
                        <div className="col my-5">
                            <input type="text" placeholder="Enter URL of Image" id="urlImage"
                                   onChange={this.updateURL} value={this.state.file_url} className="form-control"/>
                        </div>
                    </div>
                    <div className="row justify-content-center mx-2">
                        {$imagePreview}
                    </div>
                    <div className="row my-3 mx-3">
                        <input type="text" placeholder="Enter Image Caption" id="caption"
                               onChange={this.updateCaption} value={this.state.caption} className="form-control border-bottom"/>
                    </div>
                </ModalBody>
                <ModalFooter className="justify-content-center">
                    <Button color="dark" onClick={this.addimages}><i class="material-icons">
                        cloud_upload
                    </i></Button>
                    <Button color="dark" className="mx-3" onClick={this.clearModal}>Clear Contents</Button>
                    <Button color="dark" onClick={this.toggle}><i class="material-icons">
                        clear
                    </i></Button>
                </ModalFooter>
            </Modal>
        </div>;
    }
}

export default App;
