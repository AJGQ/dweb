<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0">

    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Project Record</title>
                <meta charset="UTF8"/>
            </head>
            <body>
                <h1><center>Project Record</center></h1>

                <hr/>

                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="metadata">
        <dl>
            <xsl:apply-templates/>
        </dl>

        <hr/>
        <hr/>
        
        <xsl:apply-templates select="workteam"/>
    </xsl:template>

    <xsl:template match="keyname">
        <dt><b>KEY NAME:</b></dt>
            <dd><xsl:value-of select="."/></dd>
    </xsl:template>

    <xsl:template match="title">
        <dt><b>TITLE:</b></dt>
            <dd><xsl:value-of select="."/></dd>
    </xsl:template>

    <xsl:template match="subtitle">
        <dt><b>SUBTITLE:</b></dt>
            <dd><xsl:value-of select="."/></dd>
    </xsl:template>

    <xsl:template match="supervisor">
        <dt><b>SUPERVISOR:</b></dt>
            <dd><a href="{@homepage}"><xsl:value-of select="."/></a></dd>
    </xsl:template>

    <xsl:template match="bdate">
        <dt><b>BEGIN DATE:</b></dt>
            <dd><xsl:value-of select="."/></dd>
    </xsl:template>

    <xsl:template match="edate">
        <dt><b>END DATE:</b></dt>
            <dd><xsl:value-of select="."/></dd>
    </xsl:template>

    <xsl:template match="workteam">
        <h3>
            Work Team:
        </h3>

        <table border="1">
            <tr>
                <th>Identifier</th><th>Name</th><th>Email</th><th>Git</th>
            </tr>
            <xsl:apply-templates/>
        </table>
        
        <hr/>
        <hr/>

        <xsl:apply-templates select="abstract"/>
    </xsl:template>

    <xsl:template match="worker">
        <tr>
            <xsl:apply-templates/>
        </tr>
    </xsl:template>

    <xsl:template match="identifier">
        <th>
            <xsl:value-of select="."/>
        </th>
    </xsl:template>

    <xsl:template match="name">
        <th>
            <xsl:value-of select="."/>
        </th>
    </xsl:template>

    <xsl:template match="email">
        <th>
            <xsl:value-of select="."/>
        </th>
    </xsl:template>

    <xsl:template match="git">
        <th>
            <a href="{.}"><xsl:value-of select="."/></a>
        </th>
    </xsl:template>

    <xsl:template match="abstract">
        <h3>
            Abstract:
        </h3>
        
        <xsl:apply-templates/>

        <hr/>
        <hr/>

        <xsl:apply-templates select="deliverables"/>
    </xsl:template>

    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>

    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>

    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>

    <xsl:template match="xref">
        <a href="{@url}"><xsl:value-of select="."/></a>
    </xsl:template>

    <xsl:template match="deliverables">
        <h3>
            Deliverables
        </h3>
        
        <ul>
            <xsl:apply-templates select="deliverable"/>
        </ul>

        <hr/>
    </xsl:template>

    <xsl:template match="deliverable">
        <li>
            <a href="{@path}"><xsl:value-of select="."/></a>
        </li>
    </xsl:template>
</xsl:stylesheet>
