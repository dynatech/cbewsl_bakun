import React from "react";
import { Container, Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import phivolcs_seal from "../../assets/phivolcs_seal.png";
import dynaslope_seal from "../../assets/dynaslope_seal.png";
import benguet_province_seal from "../../assets/benguet_province_seal.png";
import bak_municipal_seal from "../../assets/bakun_municipal_seal.png";
import leon_mdrrmc_responder from "../../assets/leon_mdrrmc_responder.png";
import lewc_seal from "../../assets/bak_lewc_seal.png";

const useStyles = makeStyles((theme) => ({
    md_image: {
        length: "110px",
        width: "110px",
    },
}));

function SignInLogo(props) {
    const classes = useStyles();

    return (
        <Container>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justify="space-around"
                style={{ paddingTop: "20%", paddingBottom: "5%"}}
            >
                <Grid 
                    container
                    alignItems="center"
                    justify="space-evenly"
                >
                    <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={phivolcs_seal} />
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={dynaslope_seal} />
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={benguet_province_seal} />
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={bak_municipal_seal} />
                    </Grid>
                    {/* <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={leon_mdrrmc_responder} />
                    </Grid> */}
                    {/* <Grid item xs={1} md={1}>
                        <img className={classes.md_image} src={mar_lewc_seal} />
                    </Grid> */}
                </Grid>    
            </Grid>
        </Container>
    );
}

export { SignInLogo };
