<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        version="2.0">

    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="arq">
        [<xsl:apply-templates/>]
    </xsl:template>
    
    <xsl:template match="doc">
        {<xsl:apply-templates/>}<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>

    <xsl:template match="prov | local | tit | inst | file | duracao | intxt | from | prof">
        "<xsl:value-of select="name(.)"/>": "<xsl:value-of select="normalize-space(.)"/>"<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>

    <xsl:template match="musico | obs">
        "<xsl:value-of select="name(.)"/>": {
        "text":[
        <xsl:for-each select="./text()">
            "<xsl:value-of select="normalize-space(.)"/>"<xsl:if test="not(position()=last())">,</xsl:if>
        </xsl:for-each>
        ]<xsl:if test="not(count(./*) = 0)">,</xsl:if>
            <xsl:apply-templates select="*"/>}<xsl:if test="following-sibling::*">,</xsl:if>
    </xsl:template>

    <xsl:template match="@*">
        "<xsl:value-of select="name()"/>" : "<xsl:value-of select="."/>"
    </xsl:template>
</xsl:stylesheet>
