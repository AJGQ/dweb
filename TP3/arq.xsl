<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0">

    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste Português</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><center>Arqueossítios do Nordeste Português</center></h1>
                    <h3> Índice de arqueossítios </h3>
                    <ul>
                        <xsl:apply-templates mode="index"/>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ARQELEM" mode="index">
        <li> 
            <a name="{generate-id()}"/>
            <a href="arqsit-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>

    <xsl:template match="ARQELEM">
        <xsl:result-document href="website/arqsit-{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><center><xsl:value-of select="IDENTI"/></center></h1>
                    <xsl:apply-templates/>
                    <hr/>
                    <adress>
                        <a href="index.html#{generate-id()}">
                            Voltar à pagina principal
                        </a>
                    </adress>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>

    <xsl:template match="TIPO">
        <h3>
            <xsl:value-of select="name(.)"/>: <xsl:value-of select="@ASSUNTO"/>
        </h3>
    </xsl:template>

    <xsl:template match="IDENTI"> 
    </xsl:template>

    <xsl:template match="IMAGEM"> 
        <h3>
            <img src="{@NOME}"><xsl:value-of select="name(.)"/></img>
        </h3>
    </xsl:template>

    <xsl:template match="DESCRI"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CRONO"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="LUGAR"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="FREGUE"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CONCEL"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="CODADM"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="LATITU"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="LONGIT"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="ALTITU"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="ACESSO"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="QUADRO"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="TRAARQ"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="DESARQ"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="INTERP"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="INTERE"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="DEPOSI"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="BIBLIO"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="AUTOR"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="DATA"> 
        <h3>
            <xsl:value-of select="name(.)"/>
        </h3>
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="LIGA">
        <a href="https://pt.wikipedia.org/wiki/Special:Search?search={@TERMO}&amp;go=Go"><xsl:value-of select="."/></a>
    </xsl:template>

</xsl:stylesheet>
