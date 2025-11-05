import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDebugValue, useEffect, useState } from 'react';
import yaml from 'js-yaml';

const YamlLoader = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/react-quiz-symfony/data/controllers/the_cookies.yaml') // Place YAML in /public or use full URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // YAML is plain text
            })
            .then((text) => {
                const parsed = yaml.load(text); // Convert YAML to JS object
                setData(parsed);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading YAML...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
            <pre>{JSON.stringify(data, null, 2)}</pre>
    );
};




const Div = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function App() {
    const [value, setValue] = React.useState(0);
var a = 123;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Item><Typography>
                        Symfony exam preparation tool</Typography></Item>
                </Grid>

                <Grid size={2}>
                    <Item>                        <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                        <Tab label="Item Four" {...a11yProps(3)} />
                        <Tab label="Item Five" {...a11yProps(4)} />
                        <Tab label="Item Six" {...a11yProps(5)} />
                        <Tab label="Item Seven" {...a11yProps(6)} />
                    </Tabs></Item>
                </Grid>
                <Grid size={10}>
                    <Item>
                        <TabPanel value={value} index={0}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Answer 1" />
                                <FormControlLabel control={<Checkbox />} label="Answer 2" />
                                <FormControlLabel control={<Checkbox />} label="Answer 3" />
                                <FormControlLabel control={<Checkbox />} label="Answer 4" />
                            </FormGroup>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Four
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Item Five
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            Item Six
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            Item Seven
                        </TabPanel></Item>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <Item>
                        <YamlLoader />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
