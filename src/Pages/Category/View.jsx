import React, { useEffect, useState } from 'react';
import {
    Card as MuiCard,
    CardContent,
    Typography,
    Container,
    useTheme,
    Grid,
} from '@mui/material';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompaniesByCategory } from '../../Services/Company';
import { getSubCompaniesByCategory } from '../../Services/SubCompany';
import { getCategoryById } from '../../Services/Category';
import BASE_URL from '../../config';

function ViewCategory() {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [subCompanies, setSubCompanies] = useState([]);
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        if (id) {
            getCategoryById(id)
                .then((data) => {
                    setCategoryData(data);
                    const categoryName = data.name || data.categoryName;
                    if (categoryName) {
                        getCompaniesByCategory(categoryName)
                            .then(setCompanies)
                            .catch(console.error);

                        getSubCompaniesByCategory(categoryName)
                            .then(setSubCompanies)
                            .catch(console.error);
                    }
                })
                .catch(console.error);
        }
    }, [id]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, maxHeight: '80vh', overflowY: 'auto' }}>
            {/* Header */}
            <MuiCard
                sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">{categoryData?.name || 'Category'}</Typography>
                </CardContent>
            </MuiCard>

            {/* Companies */}
            <Typography variant="h5" className="mt-4 mb-2">Companies</Typography>
            <Grid container spacing={3}>
                {companies.map((company) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                        <Card className="shadow-sm" style={{width: '16rem'}}>
                            <Card.Img variant="top" src={BASE_URL + company.imageUrl} alt={company.name} style={{ height: '11rem', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{company.name}</Card.Title>
                                <Card.Text>{company.location}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/Company/View/${company.id}`)}>View</Button>
                            </Card.Body>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* SubCompanies */}
            <Typography variant="h5" className="mt-4 mb-2">SubCompanies</Typography>
            <Grid container spacing={3}>
                {subCompanies.map((sub) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={sub.id}>
                        <Card className="shadow-sm" style={{width: '16rem'}}>
                            <Card.Img variant="top" src={BASE_URL + sub.imageUrl} alt={sub.name} style={{ height: '11rem', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{sub.name}</Card.Title>
                                <Card.Text>{sub.location}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/SubCompany/View/${sub.id}`)}>View</Button>
                            </Card.Body>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ViewCategory;